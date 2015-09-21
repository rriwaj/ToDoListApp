<?php

$db = new PDO("mysql:dbname=todoapplist;host=localhost:3306", "root", "root");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

