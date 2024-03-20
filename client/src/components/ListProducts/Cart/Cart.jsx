import './cart.css'
import { cartProducts } from '../../../services/cartProductService';
import { useEffect, useState } from 'react';
import { BoxCart } from './BoxCart/BoxCart';
import { useNavigate, Link } from 'react-router-dom';

export const Cart = () => {
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await cartProducts();
                const { meta, data } = response;
                setStatus(meta.status);
                if (status === 403) navigate('/login');
                if (meta.success) setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        }

        getCart()
    }, []);



    useEffect(() => {
        if (products) {
            const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.cartdetail.subtotal), 0);
            setTotal(totalAmount);
        }
    }, [products]);

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
                        <BoxCart key={i} image={product.image} name={product.name} quantity={product.cartdetail.quantity} price={product.cartdetail.subtotal} />
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
