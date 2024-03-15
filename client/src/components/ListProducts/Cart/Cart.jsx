import './cart.css'
import { cartProducts } from '../../../services/cartProductService';
import { useEffect, useState } from 'react';

export const Cart = () => {
    const [cart,setCart] = useState(null);
    const [products,setProducts] = useState(null);
    const [cartDetail,setCartDetail] = useState(null);

    useEffect(() => {
        const get = async () => {
            try {
                const response = await cartProducts();
                console.log(response);
                const data = response.data;
                setCart(data.cart);
                setProducts(data.products);
                setCartDetail(data.cartDetail);

            } catch(error) {
                console.log(error);
            }
        }
        get()
    }, [])
    return (
        <>
            <section className='products-cart'>
                <div className='info-product'>
                    {
                        Array.isArray(products) && products.map(product => <img src={product.image} alt="" />)

                    }
                    <div>
                        {
                            Array.isArray(products) && products.map(product => <p className='name'>{product.name}</p>)
                        }
                        {/* <span>Talle: S</span> */}
                    </div>

                    {/* <p>{cartDetail.subtotal}</p> */}
                </div>
                <div className='buttons-cart'>
                    <button className='btn delete'>Quitar</button>
                    <button className='btn modify'>Modificar</button>
                </div>
            </section>
        </>
    )
}