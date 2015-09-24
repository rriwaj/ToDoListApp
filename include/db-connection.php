<?php

$db = new PDO("mysql:dbname=todoapp;host=localhost:3306", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

