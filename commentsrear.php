<?php

require './include/db-connection.php';

$comment = filter_input(INPUT_POST, "comment");
$post_id = filter_input(INPUT_POST, "post_id");
$created_date = date("Y-m-j G:i:s ");
//session_start();
$user_id = 1; //  $_SESSION('userid');

$stmt = $db->prepare("INSERT INTO comments VALUES (NULL,:text, :userid, :itemid, :date)");
$stmt->execute(array(':text' => $comment, ':userid' => $user_id, ':itemid' => $post_id
    , ':date' => $created_date));

echo "{'success':'true'}";

