<?php

require './include/db-connection.php';
session_start();
if (!isset($_SESSION['username'])) {
    $_SESSION['error'] = "Please login First";
    header("Location: wall.php");
} else {
    $post_text = filter_input(INPUT_POST, "item_text");
    $created_date = date("Y-m-j G:i:s ");
//session_start();
    $userid =  $_SESSION['userid'];

    $stmt = $db->prepare("INSERT INTO todolist(item_text,user_id,created_date) VALUES (:text, :userid, :date)");
    $stmt->execute(array(':text' => $post_text, 'userid' => $userid
        , ':date' => $created_date));
    echo "Finished";
}

