<?php

require './include/db-connection.php';

$comment_text = "hello"; // filter_input(INPUT_POST, "post");
$item_id = 1; //filter_input(INPUT_POST, "done");
$created_date = date("Y-m-j G:i:s ");
//session_start();
$user_id = 1; //  $_SESSION('userid');

$stmt = $db->prepare("INSERT INTO comments VALUES (NULL,:text, :userid, :itemid, :date)");
$stmt->execute(array(':text' => $comment_text, ':userid' => $user_id, ':itemid' => $item_id
    , ':date' => $created_date));

echo " Finished";

