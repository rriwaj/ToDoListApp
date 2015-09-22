<?php

require './include/db-connection.php';
if (isset($_GET["delay"])) {
    sleep((int) ($_GET["delay"]));
}
$userid = 1; //$_SESSION('userid');
$stmt = $db->prepare("SELECT * FROM todolist WHERE user_id = :userid");

$stmt->execute(array(':userid' => $userid));

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo (json_encode($obj));
//foreach ($obj as $row) {
//    print(json_encode($row));
//    print('<br>');
//    print('<br>');
//}
//  echo $obj["item_text"];
//echo json_encode($obj);
//print($result);
//
//$result = $stmt->fetchAll(PDO::FETCH_COLUMN, 1);
//print_r($result);
