export const cartProducts = async () => {
    try {
        const response = await fetch('http://localhost:3099/api/products/cart', {method:'GET'});
        const data = await response.json();

        return data;
        
    } catch(error) {
        console.log(error);
    }
}