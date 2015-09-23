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
            <ul class="todo-items">
                <li todo-id="1">
                    <div class="dropdown todo-author">
                        Dheeraj Pandey
                        <span class="todo-item-option">
                            <a href="javascript:void(0);"  class="dropdown-toggle glyphicon glyphicon-chevron-down pull-right" data-toggle="dropdown"></a>                         
                            <ul class="dropdown-menu pull-right">
                                <li><a href="javascript:void(0);" data-id="1" class="edit-post">Edit</a></li>                            
                                <li><a href="javascript:void(0);" data-id="1" class="delete-post">Delete</a></li>
                                <li><a href="javascript:void(0);">Done</a></li>
                            </ul>
                        </span>
                    </div>
                    <div class="todo-text">
                        I want to accomplish this task <br>
                        <span class="date sub-text">on March 5th, 2014</span>
                    </div>
                    <ul class="todo-comments-all">
                        <li>
                            <span class="todo-comments-author">
                                <strong>Prabin Dahal</strong>
                            </span>
                            <span class="todo-comment">
                                <span class="todo-comment">When is the deadline?</span><br>
                                <span class="date sub-text">on March 5th, 2014</span>
                            </span>
                        </li>
                        <li todo-comment-id="2">
                            <span class="todo-comments-author">
                                <strong>Ananda Subedi</strong>
                            </span>
                            <span class="todo-comment">
                                <span class="todo-comment">I have not done yet.</span><br>
                                <span class="date sub-text">on March 5th, 2014</span>
                            </span>
                        </li>                       
                    </ul>
                    <form role="form">                   
                        <div class="input-group">
                            <input type="text" id="1" class="form-control" placeholder="What do you think about this?">
                            <span class="input-group-btn">
                                <button class="btn btn-default btn-comment" data-id="1" type="button">Comment</button>
                            </span>
                        </div>
                    </form>
                </li>
                <li todo-id="2">
                    <div class="dropdown todo-author">
                        Sujan Thapa
                        <span class="todo-item-option">
                            <a href="javascript:void(0);"  class="dropdown-toggle glyphicon glyphicon-chevron-down pull-right" data-toggle="dropdown"></a>                         
                            <ul class="dropdown-menu pull-right">
                                <li><a href="javascript:void(0);">Edit</a></li>                            
                                <li><a href="javascript:void(0);">Delete</a></li>
                                <li><a href="javascript:void(0);">Done</a></li>
                            </ul>
                        </span>
                    </div>
                    <div class="todo-text">
                        I want to go for a drive after WAP final exams.<br>
                        <span class="date sub-text">on March 5th, 2014</span>
                    </div>
                    <ul class="todo-comments-all">
                        <li todo-comment-id="3">
                            <span class="todo-comments-author">
                                Sachin Kushawa
                            </span>
                            <span class="todo-comment">
                                <span class="todo-comment">Can I come with you?
                                    <span class="todo-comment-option">
                                        <a href="javascript:void(0);" title="delete"  class="glyphicon glyphicon-remove pull-right"></a>
                                        <a href="javascript:void(0);"  title="edit" class="glyphicon glyphicon-pencil pull-right"></a>
                                    </span>
                                </span><br>
                                <span class="date sub-text">on March 5th, 2014</span>

                            </span>

                        </li>                                     
                        <li todo-comment-id="5">
                            <span class="todo-comments-author">
                                <strong>Anil K.C.</strong>
                            </span>
                            <span class="todo-comment">
                                <span class="todo-comment">But you promise to come with me @Sachin</span><br>
                                <span class="date sub-text">on March 5th, 2014</span>
                            </span>
                        </li>                       
                    </ul>
                    <form role="form">                   
                        <div class="input-group">
                            <input type="text" id="2" class="form-control" placeholder="What do you think about this?">
                            <span class="input-group-btn">
                                <button class="btn btn-default btn-comment" data-id="2" type="button">Comment</button>
                            </span>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</body>
</html>
