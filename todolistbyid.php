<?php

require './include/db-connection.php';

$userid = 1; //$_SESSION('userid');
$stmt = $db->prepare("SELECT * FROM todolist WHERE user_id = :userid ORDER BY created_date DESC");

$stmt->execute(array(':userid' => $userid));

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo (json_encode($obj));
