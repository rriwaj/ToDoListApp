<?php

$db = new PDO("mysql:dbname=todoapplist;host=localhost", "", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

