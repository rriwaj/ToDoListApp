<?php

require './include/db-connection.php';

$post_text = filter_input(INPUT_POST, "item_text");
$item_id = filter_input(INPUT_POST, "item_id");

$created_date = date("Y-m-j G:i:s ");

if ($post_text === null) {
    $stmt = $db->prepare("update todolist set item_done=:itemdone,created_date=:date where item_id=:id");
    $stmt->execute(array(':itemdone' => 0, ':date' => $created_date, ':id' => $item_id));
    echo "SuccessFullu Done !!";
} else {
//session_start();
    $userid = 1; //  $_SESSION('userid');

    $stmt = $db->prepare("update todolist set item_text=:text,created_date=:date where item_id=:id");
    $stmt->execute(array(':text' => $post_text, ':date' => $created_date, ':id' => $item_id));
    echo "SuccessFullu Updated !!";
}
