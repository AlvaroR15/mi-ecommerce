import { useState, useEffect } from "react";
import { getProducts } from "../../../services/productsService";
import { Card } from "../../Partials/Card";
import './offProduct.css'

export const OffProduct = () => {
    const [product, setProduct] = useState({});
    useEffect(() => {
        const getProduct = async () => {
            const response = await getProducts();
            setProduct(response.productSelected);
        }
        getProduct();
    }, [])

    return (
        <section className="off-product">
            <h2>Oferta del día</h2>
            {/* 
                aca podria poner un texto que diga "OFF" de oferta
                y los precios en (precio de oferta) precio original(tachado)
            */}
            < Card name={product.name} price={product.price * 0.8} picture={product.picture} priceOriginal={product.price} />
        </section>
    )
}