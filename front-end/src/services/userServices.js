export async function getUser(){
    try{
        const response = await fetch("http://localhost:3099/api/users/profile" , {method: 'GET', credentials: "include"})
        const data = await response.json()

        return data

        } catch(error){
            console.log(error)
    }
}