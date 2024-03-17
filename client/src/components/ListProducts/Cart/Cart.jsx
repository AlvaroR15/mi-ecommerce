import './cart.css'
import { cartProducts } from '../../../services/cartProductService';
import { useEffect, useState } from 'react';
import { BoxCart } from './BoxCart/BoxCart';

export const Cart = () => {
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const get = async () => {
            try {
                const response = await cartProducts();
                const data = response.data;
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        }
        get()
    }, []);

    useEffect(() => {
        if (products) {
            const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.cartdetail.subtotal), 0);
            setTotal(totalAmount);
        }
    }, [products]);
    return (
        <>
            <div className='container-cart'>
                {
                    Array.isArray(products) && products.map((product,i) => (
                        <BoxCart key={i} image={product.image} name={product.name} quantity={product.cartdetail.quantity} price={product.cartdetail.subtotal}  />
                    ))
                }
            </div>
            <div className='total-buy'>
                <p>Total:</p>
                <p className='total'>${(total) && total.toLocaleString()}</p>
                <button>Comprar</button>
            </div>
        </>
    )
}