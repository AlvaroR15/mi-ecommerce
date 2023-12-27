window.addEventListener("load", function(){
    let formulario = document.querySelector("form.loginForm");
    let password = document.querySelector("#password");
    let email = document.querySelector("#email");
    
    formulario.addEventListener("submit", function(e){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password.value == "" || email.value == "" || !emailRegex.test(email.value)){
            e.preventDefault();            
        }
    });
    email.addEventListener("blur", function(e){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        document.querySelector("#error_email").style.display ="none";
        if (email.value == "" || !emailRegex.test(email.value)){
            document.querySelector("#error_email").style.display ="block";
        }else{
            document.querySelector("#error_email").style.display ="none";
        }
    })
    password.addEventListener("blur", function(e){
        document.querySelector("#error_password").style.display ="none";
        if (password.value == ""){
            document.querySelector("#error_password").style.display ="block";
            return
        }else{
            document.querySelector("#error_password").style.display ="none";
        }
    })
})