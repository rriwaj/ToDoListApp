<?php
require("include/top.html");
?>

    <link href="signup.css" rel="stylesheet">
    <script src="signup.js"></script>

<div class="container">
    <div class="main">
        <form action="signupsubmit.php" method="post" onsubmit="return ValidationEvent()">
            <label>UserName :</label>
            <input id="userName" name="userName" placeholder="UserName" type="text">
            <label>Email :</label>
            <input id="email" name="email" placeholder="Valid Email" type="text">
            <label>Password :</label>
            <input id="pswrd" name="pswrd" type="password">
            <label>Confirm Password :</label>
            <input id="cnfpswrd" name="cnfpswrd" type="password">
            <input type="submit" value="Submit" >
        </form>
    </div>
</div>
