import zapatillas from '../../../assets/partials-img/zapatillasAdidas.jpg'
import './detail.css'

export const Detail = (props) => {
    return (
        <section className="detalle">
            <h1 className='name'>{props.name}</h1>
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
            <img className="container-img-big" src={zapatillas} alt="" />
            <div className="container-img-data">
                <div className="info">
                    <div className="price-talle">
                        <h3>${props.price}</h3>
                        <span>Tamaño/Talle: <b>{props.talle}</b> </span>
                    </div>
                    <h3>DESCRIPCION</h3>
                    <p>
                        {props.description}
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
    )
}