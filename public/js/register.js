window.addEventListener("load", function(){
    let formulario = document.querySelector("form.register");
    let fullname = document.querySelector("#fullname");
    let password = document.querySelector("#password");
    let email = document.querySelector("#email");
    let profilePicture = document.querySelector("#profilePicture")

    formulario.addEventListener("submit", function(e){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;

        if (fullname.value == "" || fullname.value.length < 5 || password.value == "" || password.value.length < 8 || !passwordRegex.test(password.value) || email.value == "" || !emailRegex.test(email.value) || !profilePicture.files.length){
            e.preventDefault();
        }
    });
    fullname.addEventListener("blur", function(e){
        document.querySelector("#error_fullname").style.display ="none";
        document.querySelector("#error_fullname_length").style.display ="none";
        if (fullname.value == ""){
            document.querySelector("#error_fullname").style.display ="block";
            return
        }else{
            document.querySelector("#error_fullname").style.display ="none";
        }
        if (fullname.value.length < 5){
            document.querySelector("#error_fullname_length").style.display ="block";
            return
        }else{
            document.querySelector("#error_fullname_length").style.display ="none";
        } 
    })
    password.addEventListener("blur", function(e){
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        document.querySelector("#error_password").style.display ="none";
        document.querySelector("#error_password_length").style.display ="none";
        document.querySelector("#error_password_requirements").style.display = "none";
        if (password.value == ""){
            document.querySelector("#error_password").style.display ="block";
            return
        }else{
            document.querySelector("#error_password").style.display ="none";
        }
        if (password.value.length < 8){
            document.querySelector("#error_password_length").style.display ="block";
            return
        }else{
            document.querySelector("#error_password_length").style.display ="none";
        }
        if (!passwordRegex.test(password.value)) {
            document.querySelector("#error_password_requirements").style.display = "block";
            return;
        } else {
            document.querySelector("#error_password_requirements").style.display = "none";
        } 
    })
    email.addEventListener("blur", function(e){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        document.querySelector("#error_email").style.display ="none";
        if (email.value == "" || !emailRegex.test(email.value)){
            document.querySelector("#error_email").style.display ="block";
        }else{
            document.querySelector("#error_email").style.display ="none";
        }
    })
    profilePicture.addEventListener("blur",function(e){
        document.querySelector("#error_profilePicture").style.display ="none";
        if (!profilePicture.files.length) {
            document.querySelector("#error_profilePicture").style.display ="block";
        }
        else{
            document.querySelector("#error_profilePicture").style.display ="none";
        }
    })
})