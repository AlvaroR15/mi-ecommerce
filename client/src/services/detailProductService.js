export const getProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3099/api/products/${id}`, {method: 'GET'});
        const data = await response.json();
        return data
    } catch(error) {
        console.log(error)
    }
}