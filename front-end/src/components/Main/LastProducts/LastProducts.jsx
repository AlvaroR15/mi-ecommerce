import './lastProducts.css'

import { useState, useEffect } from 'react';
import { getProducts } from '../../../services/productService';

export const LastProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getLastProducts = async () => {
            const response = await getProducts();
            setProducts(response.lastProducts)
        }
        getLastProducts()
    }, []);

    return (
        <>
            <h2 className='last-products-title'>Ultimas novedades</h2>
            <section className="last-products">
                {
                    Array.isArray(products) && products.map((product, i) => (
                        <div key={i}>
                            <img src={product.picture} className='last-product-img' />
                            <span>{product.name}</span>
                            <p>${product.price}</p>
                        </div>
                    ))
                }
                <div className='link-view'>
                    <a href="#">Ver más</a>
                </div>
            </section>
        </>
    )
}
