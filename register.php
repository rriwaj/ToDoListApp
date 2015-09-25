<?php

require './include/db-connection.php';

$username = filter_input(INPUT_POST, "username");
$password = filter_input(INPUT_POST, "password");
$email = filter_input(INPUT_POST, "emailAddress");
$created_date = date("Y-m-j G:i:s ");


$stmt = $db->prepare("INSERT INTO users (username,password,email,created_date) VALUES (:username, :password, :email, :date)");
$stmt->execute(array(':username' => $username, ':password' => $password, ':email' => $email, ':date' => $created_date));
echo "Finished";
