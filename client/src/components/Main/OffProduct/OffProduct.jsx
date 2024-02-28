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
        <a className="off-product">
            <h2>Oferta del día</h2>
            <div>
                {
                    product ? (
                        < Card id={product.id} name={product.name} price={product.price * 0.8} image={product.image} priceOriginal={product.price} size={product.size ? product.size : ''} />
                    ) : (
                        <p>{product === null ? 'Cargando...' : 'Producto no encontrado'}</p>
                    )
                }
            </div>

        </a>
    )
}