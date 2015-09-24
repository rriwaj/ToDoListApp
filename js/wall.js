$(function () {
    $("#btnAddNewToDo").on('click', function () {
        var task = $("#txtNewToDo").val();
        console.log(task);
        if (task.length > 0)
            insertNewToDo(task);
        var task = $("#txtNewToDo").val("");
//        retrieveAll();
    });
    $(document.body).on('click', '.edit-post', function () {
        var postId = $(this).data("id");
        var item_text = "replace with me";//        $(".todo-text").val();
        update(item_text, postId);
    });
    $(document.body).on('click', '.delete-post', function () {
        var postId = $(this).data("id");
        $(".todo-text").val();
        remove(postId);
    });

    var todoOperation = function () {
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
//                    console.log(data);
                }
            });
            return todoObj;
        }
        // R by id
//        function retrievebyid() {
//            $.ajax({url: 'todolistbyid.php', type: 'get', async: false, data: {}, //4,
//                success: function (data) {
//                    todoObj = data;
//                }
//            });
//            return todoObj;
//        }
        //U
        function update() {
            $.post('updatepost.php', {item_text: this.todoObj.text, item_id: this.todoObj.itemid})
                    .done(function (data) {
                        alert(data);
                    });
        }
        //D
        function remove() {
            $.post('removepost.php', {item_id: this.todoObj.itemid}).done(function (data) {
                alert(data);
            });
        }
        var publicAPI = {
            todoObj: todoObj,
            add: insert,
            update: update,
            delete: remove,
            fetchdata: retrieve
                    //fetch: retrievebyid
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

    function update(userInput, item_id) {
        if (userInput.length < 0) {
            return;
        }
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
        operation.delete();
    }
    function displayAllPosts(result) {
        var $todoItems = $('<ul class="todo-items">');
        $(result).each(function (idx, obj) {
//            document.write(JSON.stringify(obj));
            var $todoItem = $('<li data-todoitem-id="' + obj.item_id + '">');
            // post section
            var $todoItemAuthor = $('<div class="dropdown todo-author">').text(obj.post_created_by); // join and bring user name
            var $todoItemOption = $('<span class="todo-item-option">')
                    .append('<a href="#"  class="dropdown-toggle glyphicon glyphicon-chevron-down pull-right" data-toggle="dropdown"></a>');
            var $todoItemOptionMenu = $(
                    '<ul class="dropdown-menu pull-right">' +
                    '<li><a href="#" class="edit-post" data-id="' + obj.item_id + '">Edit</a></li>' +
                    '<li><a href="#" class="delete-post" data-id="' + obj.item_id + '">Delete</a></li>' +
                    '<li><a href="#" class="done-post" data-id="' + obj.item_id + '">Done</a></li>' +
                    '</ul>'
                    );
            $todoItemOption.append($todoItemOptionMenu);
            $todoItemAuthor.append($todoItemOption);
            $todoItem.append($todoItemAuthor);
            var $todoText = $('<div class="todo-text">').text(obj.item_text).append('<br><span class="date sub-text">on ' + obj.post_created_date + '</span>');
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
            return cmntObj = {
            };
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
            delete: remove
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

