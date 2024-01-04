export async function getInfo(){
    try{
        const response = await fetch("http://localhost:8000/api/general" , {method: 'GET'})
        const data = await response.json()
        if(response.status !== 200) throw new Error("Error en la conexion")

    
        return data

        } catch(error){
            console.log(error)
    }
}