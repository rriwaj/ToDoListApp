<?php include 'include/top.html' ?>

<div class="container">
    <div class="container-page">	
        <form  action="register.php" method="post">

            <div class="col-md-6">
                <h3 class="dark-grey">Registration</h3>

                <div class="form-group col-lg-12">
                    <label>Username</label>
                    <input type="text" name="username" class="form-control"  >
                </div>

                <div class="form-group col-lg-6">
                    <label>Password</label>
                    <input type="password" name="password" class="form-control">
                </div>

                <div class="form-group col-lg-6">
                    <label>Confirm Password</label>
                    <input type="password" name="cnfpassword" class="form-control">
                </div>

                <div class="form-group col-lg-12">
                    <label>Email Address</label>
                    <input type="email" name="emailAddress" class="form-control" >
                </div>

                <input  class="btn btn-lg btn-primary btn-block" type="submit"  value="Register"/>
            </div>
        </form>

    </div>

</div>
<?php include 'include/bottom.html' ?>