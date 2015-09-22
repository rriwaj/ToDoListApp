<?php

require './include/db-connection.php';

$post_text = filter_input(INPUT_POST, "item_text");

$item_done = 1; //filter_input(INPUT_POST, "done");
$created_date = date("Y-m-j G:i:s ");
//session_start();
$userid = 1; //  $_SESSION('userid');

$stmt = $db->prepare("INSERT INTO todolist VALUES (NULL,:text, :done, :userid, :date)");
$stmt->execute(array(':text' => $post_text, ':done' => $item_done, 'userid' => $userid
    , ':date' => $created_date));
echo "Finished";