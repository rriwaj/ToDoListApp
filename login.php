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
<div style="height: 30px"></div>

<div class="container">
    <form class="form-signin" action="loginsubmit.php" method="post">
        <h2 class="form-signin-heading">User Login</h2>

        <label  class="sr-only"></label>
        <input class="form-control" placeholder="username" required autofocus type="text" name="name"<?php if ($user) : ?>
                   value="<?= $user ?>"  <?php endif; ?>  />

        <label class="sr-only"></label>
        <input type="password" name="password" class="form-control" placeholder="Password" required>

        <div class="checkbox">
            <label>
                <input type="checkbox" name="currentUser" value="on"
                <?php if ($user) : ?>
                           checked
                       <?php endif; ?>
                       />Remember me
            </label>
        </div>

        <input  class="btn btn-lg btn-primary btn-block" type="submit"  value="login"/>
        <div style="text-align: right">
            <br>            
            New User ?? <a href="signup1.php">Register here</a>  </div>

    </form>

    <div><?php if ($error): ?>
            <p align="center" style="color: red"><?= $error ?></p>
        <?php endif; ?>
    </div>
</div>
<?php include("include/bottom.html"); ?>
