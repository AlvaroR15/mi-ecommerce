export async function getUser(){
    try{
        const response = await fetch("http://localhost:3099/api/users/profile" , {
            mode: 'cors',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            }})
        const data = await response.json()

        return data

        } catch(error){
            throw error;
    }
}