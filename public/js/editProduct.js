window.addEventListener("load", function(){
    let formulario = document.querySelector("form.editProduct");
    let nombreProd = document.querySelector("#nombreProd");
    let precio = document.querySelector("#precio");
    let categoria = document.querySelector("#categoria");
    let talle = document.querySelector("#talle");
    let descripcion = document.querySelector("#descripcion");

    formulario.addEventListener("submit", function(e){
        if (nombreProd.value == "" || nombreProd.value.length < 5 || precio.value == "" || precio.value < 0 || categoria.value == "" || talle.value == "" || descripcion.value == "" || descripcion.value < 20 ){
            e.preventDefault();            
        }
    });
    nombreProd.addEventListener("blur", function(e){
        document.querySelector("#error_nombreProd").style.display ="none";
        document.querySelector("#error_nombreProd_length").style.display ="none";
        if (nombreProd.value == ""){
            document.querySelector("#error_nombreProd").style.display ="block";
            return
        }else{
            document.querySelector("#error_nombreProd").style.display ="none";
        }
        if (nombreProd.value.length < 5){
            document.querySelector("#error_nombreProd_length").style.display ="block";
            return
        }else{
            document.querySelector("#error_nombreProd_length").style.display ="none";
        }
    })
    precio.addEventListener("blur", function(e){
        document.querySelector("#error_precio").style.display ="none";
        if (precio.value == "" || precio.value < 0){
            document.querySelector("#error_precio").style.display ="block";
            return
        }else{
            document.querySelector("#error_precio").style.display ="none";
        }
    })
    categoria.addEventListener("blur",function(e){
        document.querySelector("#error_categoria").style.display ="none";
        if (categoria.value == ""){
            document.querySelector("#error_categoria").style.display ="block";
            return
        }else{
            document.querySelector("#error_categoria").style.display ="none";
        }
    })
    talle.addEventListener("blur",function(e){
        document.querySelector("#error_talle").style.display ="none";
        if (talle.value == ""){
            document.querySelector("#error_talle").style.display ="block";
            return
        }else{
            document.querySelector("#error_talle").style.display ="none";
        }
    })
    descripcion.addEventListener("blur",function(e){
        document.querySelector("#error_descripcion").style.display ="none";
        document.querySelector("#error_descripcion_length").style.display ="none";
        if (descripcion.value == ""){
            document.querySelector("#error_descripcion").style.display ="block";
            return
        }else{
            document.querySelector("#error_descripcion").style.display ="none";
        }
        if (descripcion.value < 20){
            document.querySelector("#error_descripcion_length").style.display ="block";
            return
        }else{
            document.querySelector("#error_descripcion_length").style.display ="none";
        }
    })
})