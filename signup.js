/**
 * Created by Prabin on 9/22/2015.
 */
function ValidationEvent() {
// Storing Field Values In Variables
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pswrd").value;
    var confirmPassword = document.getElementById("cnfpswrd").value;
    function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
// Regular Expression For Email
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
// Conditions
    if (userName != '' && email != '') {
        
         if(!validateEmail(email)){
            alert("Invalid Email");
            return false;
        }
        if(password!=confirmPassword){
                alert("Password Did not Match");
                return false;
        }
            
        return true;
    }
    alert("No Field can be empty");
    return false;
    
}