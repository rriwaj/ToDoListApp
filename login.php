<?php
include("include/top.html");

session_start();
$error = NULL;
if (isset($_SESSION['error'])) {
    $error = $_SESSION['error'];
    unset($_SESSION['error']);
}
$user = filter_input(INPUT_COOKIE, "currentUser");
?>
<div>
    <form action="loginsubmit.php" method="post">
        <fieldset>

            <legend>User Login</legend>

            <?php if ($error): ?>
                <p align="center" style="color: red"><?= $error ?></p>
            <?php endif; ?>

            <p><span> Name: </span>
                <input type="text" name="name" size="16"<?php if ($user) : ?>
                           value="<?= $user ?>"  <?php endif; ?>  />
            </p>

            <p><span>Password: </span>
                <input type="password" name="password" size="16">
            </p>

            <input type="checkbox" name="currentUser" value="on"
            <?php if ($user) : ?>
                       checked
                   <?php endif; ?>
                   />Remember me<br>

            <p><input type="submit"  value="login"/></p>

        </fieldset>

    </form>
</div>
<?php include("include/bottom.html"); ?>
