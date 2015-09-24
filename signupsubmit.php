<?php

require './include/db-connection.php';
$userName = filter_input(INPUT_POST, "userName");
$password = filter_input(INPUT_POST, "pswrd");
$confirmpassword = filter_input(INPUT_POST, "cnfpswrd");
$email = filter_input(INPUT_POST, "email");
$query = "INSERT INTO users VALUES (NULL, :userName, :pass_hash, :email, :createdate)";
$stmt = $db->prepare($query);
$bind = array(':userName' => $userName, ':pass_hash' => password_hash($password, PASSWORD_DEFAULT), ':email' => $email, ':createdate' => "2015-09-01 00:00:00");
$added = $stmt->execute($bind);

if($added){
    echo "Done";
}
