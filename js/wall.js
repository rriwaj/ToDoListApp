$(function () {
    "use strict";
    var id;
    (function getUserInfo() {
        $.ajax({url: 'sessioninfo.php', type: 'get', async: false,
            success: function (data) {
                id = data;
            }
        });
    })();
    $("#btnAddNewToDo").on('click', function () {
        var task = $("#txtNewToDo").val();
        if (task.length > 0) {
            insertNewToDo(task);
        }
        $("#txtNewToDo").val("");
    });
    $(document.body).on('click', '.edit-post', function () {  //edit function call
        var postId = $(this).data("id");
        var $rootPost = $("[data-todoitem-id=" + postId + "]").find('.todo-text');
        var item_text = $rootPost.find("label").text();
        var $commentForm = $('<form role="form">');
        var $InputGroup = $('<div data-input-group-id="' + postId + '" class="input-group">');
        var $txt = $('<input type="text" value="' + item_text + '" id="12" class="form-control">');
        $commentForm.append($InputGroup);
        $InputGroup.append($txt);
        var $btnComment = $('<span class="input-group-btn">').append('<button class="btn btn-default" data-edit-id="' + postId + '" data-id="' + 122 + '" type="button">Update</button>');
        $InputGroup.append($btnComment);
        $rootPost.replaceWith($InputGroup);

        var $btn = $('.todo-items').find("[data-todoitem-id=" + postId + "]").find("button");

        $btn.on('click', function () {
            var $textEdit = $('#12').val();
            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();
            var curr_time_hr = d.getHours();
            var curr_time_min = d.getMinutes();
            var curr_time_sec = d.getSeconds();
            var $dateTime = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_time_hr + ":" + curr_time_min + ":" + curr_time_sec;
            update(postId, $textEdit);
//            var $todoText = $('<div class="todo-text">').append("<label>" + $textEdit + "</label>").append('<br><span class="date sub-text">on ' + $dateTime + '</span>');
//            $('[data-input-group-id=' + postId + ']').replaceWith($todoText); // problem with same input group class also in comment
        });
    });
    $(document.body).on('click', '.delete-post', function () {  //delete function call
        var postId = $(this).data("id");
        $(".todo-text").val();
        remove(postId);
    });

    $(document.body).on('click', '.done-post', function () {      //update done call
        var postId = $(this).data("id");
        update(postId);
    });

    var todoOperation = function () {  //factory object
        var todoObj; //C
        function insert() {
            // ajax method call to php file
            $.post('postrear.php', {item_text: this.todoObj.text}).done(function (data) {
                retrieveAll(); // do it asynchronously outside private function
            });
        }
        //R
        function retrieve() {
            $.ajax({url: 'todolistobject.php', type: 'get', async: false,
                success: function (data) {
                    todoObj = data;
                }
            });
            return todoObj;
        }
        //U
        function update() {
            $.post('updatepost.php', {item_text: this.todoObj.text, item_id: this.todoObj.itemid})
                    .done(function (data) {
                        retrieveAll();
                    });
        }
        //D
        function remove() {
            $.post('removepost.php', {item_id: this.todoObj.itemid}).done(function (data) {
                retrieveAll();
            });
        }
        var publicAPI = {
            todoObj: todoObj,
            add: insert,
            update: update,
            erase: remove,
            fetchdata: retrieve
        };
        return publicAPI;
    };
    function insertNewToDo(userInput) {
        //1. validation
        //2. create javascript object for publicAPI
        //3. create and call publicAPI method
        if (userInput.length < 0) {
            return;
        }
        var obj = {
            text: userInput
        };
        var operation = todoOperation();
        operation.todoObj = obj;
        operation.add();
    }

    function update(item_id, userInput) {
        var obj = {
            text: userInput,
            itemid: item_id
        };
        var operation = todoOperation();
        operation.todoObj = obj;
        operation.update();
    }

    function retrieveAll() {
        var operation1 = todoOperation();
        var result = operation1.fetchdata();
        displayAllPosts(result);
    }

    retrieveAll(); // load all data on page load
    function remove(postid) {
        var obj = {
            itemid: postid
        };
        var operation = todoOperation();
        operation.todoObj = obj;
        operation.erase();
    }

    function displayAllPosts(result) {
        var $todoItems = $('<ul class="todo-items">');
        $(result).each(function (idx, obj) {
            var $todoItem = $('<li data-todoitem-id="' + obj.item_id + '">');
            // post section
            var $todoItemAuthor = $('<div class="dropdown todo-author">').text(obj.post_created_by); // join and bring user name
            if (obj.item_user_id === id) {
                var $todoItemOption = $('<span class="todo-item-option">')
                        .append('<a href="#"  class="dropdown-toggle glyphicon glyphicon-chevron-down pull-right" data-toggle="dropdown"></a>');
                var $todoItemOptionMenu = $('<ul class="dropdown-menu pull-right">' 
                        + '<li><a href="#" class="edit-post" data-id="' + obj.item_id + '">Edit</a></li>' 
                        + '<li><a href="#" class="delete-post" data-id="' + obj.item_id + '">Delete</a></li>' 
                        + '<li><a href="#" class="done-post" data-id="' + obj.item_id + '">Done</a></li>' 
                        +'</ul>'
                        );
                $todoItemOption.append($todoItemOptionMenu);
                $todoItemAuthor.append($todoItemOption);

            }
            $todoItem.append($todoItemAuthor);
            var $todoText = $('<div class="todo-text">').append("<label>" + obj.item_text + "</label>").append('<br><span class="date sub-text">on ' + obj.post_created_date + '</span>');
            $todoItem.append($todoText);
            // comment section
            var $todoCommentsAll = $('<ul data-comments-post-id="' + obj.item_id + '" class="todo-comments-all">');
            // use each method to loop through each comments
            $(obj.comments).each(function (id, ob) {
                var $todoList = $('<li data-comment-id="' + ob.comment_id + '">'); // replace with comment id
                var $todoCommentAuthor = $('<span class="todo-comments-author">').text(ob.username);
                var $todoComment = $('<span class="todo-comment">').text(ob.comment_text).append('<br><span class="date sub-text">on ' + ob.comment_created_date + '</span>'); // replace with comment text and date created            
                $todoList.append($todoCommentAuthor);
                $todoList.append($todoComment);
                $todoCommentsAll.append($todoList);
            });

            $todoItem.append($todoCommentsAll);
            $todoItem.append($todoCommentsAll);
            // comment form section
            var $commentForm = $('<form role="form">');
            var $commentInputGroup = $('<div class="input-group">');
            var $txtComment = $('<input type="text" id="' + obj.item_id + '" class="form-control" placeholder="What do you think about this?">');
            $commentForm.append($commentInputGroup);
            $commentInputGroup.append($txtComment);
            var $btnComment = $('<span class="input-group-btn">').append('<button class="btn btn-default btn-comment" data-id="' + obj.item_id + '" type="button">Comment</button>');
            $commentInputGroup.append($btnComment);
            $todoItem.append($commentForm);
            $todoItems.append($todoItem);
        });
        $('.todo-all').html($todoItems);
    }

//    $(".btn-comment").on('click', function () {
    $(document.body).on('click', '.btn-comment', function () {
        var postId = $(this).data("id");
        var postCmnt = $("#" + postId).val();
//         var cmntPostUl = $("[data-comments-post-id=" + postId + "]");
//        console.log(cmntPostUl.html());

        if (postCmnt.length > 0) {
            insertNewComments(postId, postCmnt);
//            cmntPostUl.append('<li>' + postCmnt + '</li>');            

        }
    });
    var commentsOperation = function () {
        // private fields
        var cmntObj;
        //private method
        //C
        function insert() {
            // ajax method call to php file
            $.post('commentsrear.php', {comment: this.cmntObj.comment, post_id: this.cmntObj.postId}).done(function (data) {
//                alert(data);
                retrieveAll();
            }).error();
        }
        //R
        function retrieve() {

        }
        // R by id
        function retrieveById(id) {
//            $.get('commentsrear.php')
            return cmntObj;
        }
        //U
        function update() {
            // ajax method call to php file
        }
        //D
        function remove() {
            // ajax method call to php file
        }
        var publicAPI = {
            cmntObj: cmntObj,
            add: insert,
            select: retrieve,
            selectById: retrieveById,
            erase: remove
        };
        return publicAPI;
    };

    function insertNewComments(postId, userComment) {
        var cmnt = commentsOperation();
        cmnt.cmntObj = {
            postId: postId,
            comment: userComment
        };
        cmnt.add();
    }

});