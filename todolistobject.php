<?php

require './include/db-connection.php';
if (isset($_GET["delay"])) {
    sleep((int) ($_GET["delay"]));
}
$userid = 1; //$_SESSION('userid');
$stmt = $db->prepare("SELECT * FROM todolist");

$stmt->execute(array(':userid' => $userid));

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo (json_encode($obj));
