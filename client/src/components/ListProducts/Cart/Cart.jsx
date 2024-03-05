import zapatillas from '../../../assets/partials-img/zapatillasAdidas.jpg'
import './cart.css'
import { cartProducts } from '../../../services/cartProductService';
import { useEffect, useState } from 'react';

export const Cart = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const get = async () => {
            try {
                const response = await cartProducts();
                const data = response.data;
                const cartUser = data.cartUser;

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
                    <img src={zapatillas} alt="" />
                    <div>
                        <p className='name'>Zapatillas Adidas blancas</p>
                        <span>Talle: S</span>
                    </div>
                </div>
                <div className='buttons-cart'>
                    <button className='btn delete'>Quitar</button>
                    <button className='btn modify'>Modificar</button>
                </div>
            </section>
        </>
    )
}