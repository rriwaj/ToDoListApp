$(function () {
    //data load 
    $("#btnAddNewToDo").on('click', function () {
        var task = $("#txtNewToDo").val();
        insertNewToDo(task);
    });
    $(".btn-comment").on('click', function () {
        var postId = $(this).data("id");
        var postCmnt = $("#" + postId).val();
        insertNewComments(postId, postCmnt);
    });
    var todoOpertion = function () {
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
});
(function retrieveAll() {           //pageload retrieve event IIFE
    var operation1 = todoOperation();
    var result = operation1.fetchdata();
    displayAllPosts(result);
})();

function displayAllPosts(result) {

//    $('.todo-all').append($("<ul class='todo-items'>"));
//
//    //$.each(result, function (id, value) {
//    var i;
//    for (i = 0; i < 7; i++) {
//        $('.todo-items').append("<li>").append('<div class="dropdown todo-author">')
//        .append(result[i].item_text);
//    }

//    var i;
//    for (i = 0; i < 7; i++) {
//      console.log(result[i].item_text, result[i].user_id, result[i].created_date);
//    }
}
