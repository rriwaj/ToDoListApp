<?php

require './include/db-connection.php';
if (isset($_GET["delay"])) {
    sleep((int) ($_GET["delay"]));
}
$userid = 1; //$_SESSION('userid');

$stmt = $db->prepare("
        SELECT 
              t.item_id
            , u.user_id AS post_user_id
            , t.item_text
            , t.item_done
            , t.created_date  AS post_created_date
            , u.username AS post_created_by
            , c.comment_text
            , c.created_date AS comment_created_date
            , c.user_id AS comment_user_id
            , cu.username AS comment_created_by
        FROM todolist t 
        INNER JOIN users u ON t.user_id = u.user_id 
        LEFT JOIN comments c ON c.item_id = t.item_id 
        INNER JOIN users cu ON c.user_id = cu.user_id
        WHERE u.user_id = :userid");

$stmt->execute(array(':userid' => $userid));

$obj = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo (json_encode($obj));
