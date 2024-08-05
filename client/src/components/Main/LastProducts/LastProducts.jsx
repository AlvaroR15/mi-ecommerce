import './lastProducts.css'

import { useState, useEffect } from 'react';
import { lastProducts } from '../../../services/productsService';
import { Link } from 'react-router-dom';


export const LastProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getLastProducts = async () => {
            const response = await lastProducts();
            setProducts(response.data)
        }
        getLastProducts()
    }, []);

    return (
        <>
            <h2 className='last-products-title'>Recién llegados</h2>
            <section className="last-products">
                {
                    Array.isArray(products) && products.map((product, i) => (
                        <div key={i}>
                            <img src={product.image} className='last-product-img' />
                            <span>{product.name}</span>
                            <p>${product.price}</p>
                        </div>
                    ))
                }
                <div className='link-view'>
                    <Link to='/products'>Ver más</Link>
                </div>
            </section>
        </>
    )
}
