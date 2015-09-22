$(function () {
    $("#btnAddNewToDo").on('click', function () {
        var $task = $("#txtNewToDo").val();
        insertNewToDo($task);
    });

    var todoOpertion = function () {
        var todoObj;
        //C
        function insert() {
            // ajax method call to php file
            //alert(this.todoObj.text);
            $.post('postrear.php', {item_text: this.todoObj.text}).done(function(data){
                alert(data);
            });
        }
        //R
        function retrieve() {

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
            delete: ""
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

        var operation = todoOpertion();
        operation.todoObj = obj;
        operation.add();
//        var $todotask = $("#txtNewToDo").val();
//        if ($todotask.length > 0) {
//            insertNewToDo($todotask);
//        }

    }

});