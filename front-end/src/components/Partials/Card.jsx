import logo from '../../assets/partials-img/Logo.png';
import './card.css'

export const Card = () => {
    return (
        <article>
    <a href="#" className="card">
        <img className="contenedor-img" src={logo} alt="" />
        
        <div className="card__price">$1000</div>
        <div className="card__title">Articulo</div>
        <div className="card__subtitle">Tamaño / Talle: <b>XL</b></div>
    </a>

</article>
    )
}