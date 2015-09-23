<?php

require './include/db-connection.php';

$post_id = filter_input(INPUT_POST, "item_id");

//session_start();
$stmt = $db->prepare("delete from todolist where item_id=:itemid");
$stmt->execute(array(':itemid' => $post_id));
echo "Successfully deleted !!";

