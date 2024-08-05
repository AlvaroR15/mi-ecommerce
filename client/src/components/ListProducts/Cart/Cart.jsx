import './cart.css'
import { cartProducts } from '../../../services/cartProductService';
import { useEffect, useState } from 'react';
import { BoxCart } from './BoxCart/BoxCart';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const Cart = () => {
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(null);
    const [cartUpdated, setCartUpdated] = useState(false);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await cartProducts();
                const { meta, data } = response;
                setStatus(meta.status);
                if (status === 403) navigate('/login');
                if (meta.success) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getCart()
    }, [cartUpdated]);



    useEffect(() => {
        if (products) {
            const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.cartDetail.subtotal), 0);
            setTotal(totalAmount);
        }
    }, [products]);

    const handleCartUpdate = () => {
        setCartUpdated(prevState => !prevState);
    }

    if (!products || products.length === 0) {
        return (
            <div className='msg-error'>
                <h1>No tienes productos agregados al carrito</h1>
                <Link to='/products'>Ver Productos </Link>&rarr;
            </div>
        )
    }
    return (
        <>
            <div className='container-cart'>
                {
                    Array.isArray(products) && products.map((product, i) => (
                        <BoxCart 
                        cartId={product.cartDetail.cartId}
                        productId={product.id} 
                        key={i} 
                        image={product.image} 
                        name={product.name} 
                        quantity={product.cartDetail.quantity} 
                        price={product.cartDetail.subtotal} 
                        onCartUpdate={handleCartUpdate} />
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
