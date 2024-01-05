import product from '../../assets/partials-img/zapatillasAdidas.jpg';
import './card.css'

export const Card = () => {
    return (
        <article>
    <a href="#" className="card">
        <img className="contenedor-img" src={product} alt="" />
        
        <div className="card__price">$1000</div>
        <div className="card__title">Articulo</div>
        <div className="card__subtitle">Tamaño / Talle: <b>XL</b></div>
    </a>

</article>
    )
}