<?php

require './include/db-connection.php';
if (isset($_GET["delay"])) {
    sleep((int) ($_GET["delay"]));
}
$userid = 1;
$stmt = $db->prepare("SELECT todolist.*,users.username FROM todolist,users WHERE item_done <> 1 ORDER BY todolist.created_date DESC");
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
$items = array();
foreach ($rows as $row) {
    $item = array
        (
        'item_id' => $row['item_id'],
        'item_user_id' => $row['user_id'],
        'item_text' => $row['item_text'],
        'post_status' => $row['item_done'],
        'post_created_date' => $row['created_date'],
        'post_created_by' => $row['username'],
        'post_comments' => array()
    );
    $stmt = $db->prepare("SELECT 
        	 comments.comment_id
                ,comments.comment_text
                ,comments.user_id AS comment_user_id
                ,comments.created_date AS comment_created_date
                ,users.username
            FROM comments,users WHERE comments.item_id=:post_id ORDER BY comments.created_date DESC");
    $stmt->execute(array(':post_id' => $row['item_id']));
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $item['comments'] = $comments;
    $items[] = $item;
}
echo (json_encode($items, JSON_PRETTY_PRINT));
