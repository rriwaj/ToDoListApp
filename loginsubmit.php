<?php
require './include/db-connection.php';

$name = filter_input(INPUT_POST, "name");
$password = filter_input(INPUT_POST, "password");

$stmt = $db->prepare("SELECT * FROM users WHERE username=:name");
$stmt->execute(array(':name' => $name));
$user = $stmt->fetch();
session_start();

//cookie handling
$currentUser = filter_input(INPUT_POST, "currentUser");
if ($currentUser) {
    setcookie("currentUser", $name, time() + 60 * 60 * 24 * 60);
} else if (isset($_COOKIE['currentUser'])) {
    setcookie("currentUser", "", time() - 1);
}

if ($user != NULL && $password === $user['password']) {
    $_SESSION['username'] = $name;
    $_SESSION['userid'] = $user['user_id'];
    header("Location: login.php");
} else {
    $_SESSION['error'] = "Invalid username or password";
    header("Location: login.php");
    exit();
}
?>
