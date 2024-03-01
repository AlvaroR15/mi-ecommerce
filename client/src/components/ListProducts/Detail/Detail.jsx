import './detail.css'
import { useState, useEffect } from 'react';
import { getProduct } from '../../../services/detailProductService';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Detail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    
    useEffect(() => {
        const getData = async () => {
            const response = await getProduct(id);
            if (!response || response.error) {
                console.error('Producto no encontrado o error en la solicitud:', response);
                setProduct(null);
                return;
              }

            setProduct(response.product)
        }
        getData()
    }, [id]);


    const addToCart = async () => {
        await axios.post('http://localhost:3099/api/products/add', {
            productId: product.id,
            quantity: quantity
        });
    }
    return (
        <>
        {product ? (
        <section className="detalle">
            <h1 className='name'>{product.name}</h1>
            <div className="stars-genre">
                <div className="califications">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <img className="container-img-big" src={product.image} alt="" />
            <div className="container-img-data">
                <div className="info">
                    <div className="price-talle">
                        <h3>${product.price}</h3>
                        <span>{`${product.size ? 'Tamaño/Talle: ' : ''}`}<b>{product.size}</b> </span>
                    </div>
                    <h3>DESCRIPCION</h3>
                    <p>
                        {product.description}
                    </p>
                    <h3>CANTIDAD</h3>
                    <select name="quantity" onChange={(e) => setQuantity(e.target.value)}>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div className="button">
                        <button className="boton-primario">Comprar ahora</button>
                        <button onClick={addToCart} className="boton-secundario">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </section>
        ): (
            <p>{product === null ? 'Cargando...' : 'Producto no encontrado'}</p>
        )}
        </>
    )
}