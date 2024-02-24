import './detail.css'
import { useState, useEffect } from 'react';
import { getProduct } from '../../../services/detailProductService';
import { useParams } from 'react-router-dom';

export const Detail = () => {
    const [product, setProduct] = useState(null);
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
    }, [id])
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
                <span>Hombre</span>
            </div>
            <img className="container-img-big" src={product.image} alt="" />
            <div className="container-img-data">
                <div className="info">
                    <div className="price-talle">
                        <h3>${product.price}</h3>
                        <span>Tamaño/Talle: <b>{product.size}</b> </span>
                    </div>
                    <h3>DESCRIPCION</h3>
                    <p>
                        {product.description}
                    </p>
                    <h3>CANTIDAD</h3>
                    <select name="cantidad">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <div className="button">
                        <button className="boton-primario">Comprar ahora</button>
                        <button className="boton-secundario">Agregar al carrito</button>
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