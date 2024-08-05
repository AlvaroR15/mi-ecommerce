const url = "http://localhost:3099/api/products";

export async function listAllProducts(page = 1, limit = 5){
    try{
        const response = await fetch(`${url}/list?page=${page}&limit=${limit}` , {method: 'GET'})
        const data = await response.json()
        return data
        } catch(error){}
}

export async function lastProducts() {
    try {
        const response = await fetch(`${url}/latest`, {method: 'GET'});
        const data = await response.json();
        return data;
    } catch (error) {}
}

export async function productOnOffer() {
    try {
        const response = await fetch(`${url}/offer`,{method: 'GET'});
        const data = response.json();

        return data;
    } catch (error) {}
}