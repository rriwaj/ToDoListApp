$(function () {

    $("#btnAddNewToDo").on('click', function () {
        var task = $("#txtNewToDo").val();
        insertNewToDo(task);
    });

    $(".edit-post").on('click', function () {
        var postId = $(this).data("id");
        var item_text = "replace with me";
        $(".todo-text").val();
        update(item_text, postId);
    });

    $(".delete-post").on('click', function () {
        var postId = $(this).data("id");
        $(".todo-text").val();
        remove(postId);
    });

    $("#edit").on('click', function () {
        var task = $("#txtNewToDo").val();
        update(task);
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

    (function retrieveAll() {           //pageload retrieve event IIFE
        var operation1 = todoOperation();
        var result = operation1.fetchdata();
        displayAllPosts(result);
    })();

//    function retrievebyid() {
//        var operation = todoOperation();
//        var result = operation.fetch();
//        //updateposts(result);
//    }

    function remove(postid) {
        var obj = {
            itemid: postid
        };
        var operation = todoOperation();
        operation.todoObj = obj;
        operation.delete();
    }

});
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
