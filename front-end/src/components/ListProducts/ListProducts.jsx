import { Card } from "../Partials/Card"
import './listProducts.css'

import { getProducts } from "../../services/productService"
import { useState, useEffect } from "react"

export const ListProducts = () => {
    const [products,setProducts] = useState([]);

    useEffect(() => {
        const getInfo = async() => {
            const response = await getProducts();
            setProducts(response.products)
        }
        getInfo()
    }, [])

    return (
        <section className="list-products">
            <h2>Catálogo</h2>
            <div className="container-list-products">
                {
                    Array.isArray(products) && products.map((product,i) => (
                        <Card name={product.name} picture={product.picture} price={product.price} size={product.size} key={i} />
                    ))
                }
            </div>
        </section>
    )
}
