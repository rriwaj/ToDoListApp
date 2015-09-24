<!DOCTYPE html>
<?php include 'include/top.html' ?>
<link href="css/style.css" rel="stylesheet" type="text/css"/>
<body>    
    <script src="js/wall.js" type="text/javascript"></script>
    <script src="js/comments.js" type="text/javascript"></script>
    <div class="col-md-3">   
    </div>
    <div class="col-md-9">
        <div class="add-todo">
            <div class="add-todo-text">
                <p>                    
                    <label id="lblLoggedInUser">Riwaj Rimal</label>               
                    <textarea id="txtNewToDo" class="form-control" placeholder="What are you planning to do?" cols="40" rows="2"></textarea>                
                </p>
                <button id="btnAddNewToDo" class="btn btn-default ">Add</button>
            </div>
        </div>
        <div class="todo-all">
        </div>
    </div>
</body>
</html>
