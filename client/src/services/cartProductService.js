export const cartProducts = async () => {
    try {
        const response = await fetch('http://localhost:3099/api/products/cart', {
            mode: 'cors',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            }});
        const data = await response.json();

        return data;
        
    } catch(error) {
        console.log(error);
    }
}