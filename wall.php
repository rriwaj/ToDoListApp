<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION['username'])) {
    $_SESSION['error'] = "Please login First";
    header("Location: login.php");
} else {
    include 'include/top.html';
    ?>
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <script src="js/wall.js" type="text/javascript"></script>
    <script src="js/comments.js" type="text/javascript"></script>
    <div style="margin-right: 100px;text-align: right"><a href="logout.php">Logout</a></div>
    <div class="col-md-3">   
    </div>
    <div class="col-md-9">
        <div class="add-todo">
            <div class="add-todo-text">
                <p>                    
                    <label id="lblLoggedInUser"><?= $_SESSION['username'] ?></label>               
                    <textarea id="txtNewToDo" class="form-control" placeholder="What are you planning to do?" cols="40" rows="2"></textarea>                
                </p>
                <button id="btnAddNewToDo" class="btn btn-default ">Add</button>
            </div>
        </div>
        <div class="todo-all">
        </div>
    </div>

    <?php
}
//include("include/bottom.html");

