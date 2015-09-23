$(function () {
    //data load 
    $("#btnAddNewToDo").on('click', function () {
        var task = $("#txtNewToDo").val();
        insertNewToDo(task);
    });

    $(".btn-comment").on('click', function () {
        var postId = $(this).data("id");
        var postCmnt = $("#" + postId).val();
        //insertNewComments(postId, postCmnt);
    });

    var todoOperation = function () {
        var todoObj;
        //C
        function insert() {
            // ajax method call to php file
            //alert(this.todoObj.text);
            $.post('postrear.php', {item_text: this.todoObj.text}).done(function (data) {
                alert(data);
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
        function set(x) {
            return x;
        }
        // R by id
        function retrieveById(id) {

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
            todoObj: todoObj,
            add: insert,
            update: "",
            delete: "",
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

    var commentsOperation = function () {
        // private fields
        var cmntObj;
        //private method
        //C
        function insert() {
            // ajax method call to php file
            $.post('commentsrear.php', {comment: this.cmntObj.comment, post_id: this.cmntObj.postId}).done(function (data) {
                alert(data);
            });
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

    (function retrieveAll() {           //pageload retrieve event IIFE
        var operation1 = todoOperation();
        var result = operation1.fetchdata();
        displayAllPosts(result);
    })();

    function displayAllPosts(result) {
        var $todoItems = $('<ul class="todo-items">');
        $(result).each(function (idx, obj) {
            document.write(JSON.stringify(obj));
            var $todoItem = $('<li data-todoitem-id="' + obj.item_id + '">');
            // post section
            var $todoItemAuthor = $('<div class="dropdown todo-author">').text(obj.username); // join and bring user name
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
            var $todoCommentsAll = $('<ul class="todo-comments-all">');
            // use each method to loop through each comments
            for (var i = 0; i < 2; i++) {
                var $todoList = $('<li data-comment-id="' + 1 + '">'); // replace with comment id
                var $todoCommentAuthor = $('<span class="todo-comments-author">').text('Riwaj Rimal');
                var $todoComment = $('<span class="todo-comment">').text('When is the deadline').append('<br><span class="date sub-text">on ' + '22/09/2015' + '</span>'); // replace with comment text and date created            
                $todoList.append($todoCommentAuthor);
                $todoList.append($todoComment);
                $todoCommentsAll.append($todoList);
            }

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
        $('.todo-all').prepend($todoItems);
//
//
//        var i;
//        for (i = 0; i < 2; i++) {
//            console.log(result[i].item_text, result[i].user_id, result[i].created_date);
//        }
    }
});
