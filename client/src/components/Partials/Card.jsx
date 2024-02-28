import './card.css'

import { Link } from 'react-router-dom'

export const Card = (props) => {
    return (
        <article>
            <Link to={`/products/${props.id}`} className="card">
                <img className="contenedor-img" src={props.image} alt={props.name} />
                <div className='prices'>
                    <span className="card__price">${props.price}</span>
                    <span className='price-original'>{props.priceOriginal}</span>
                </div>
                <div className="card__title">{props.name}</div>
                <div className="card__subtitle">{`${props.size ? 'Tamaño / Talle: ' : ''}`}<b>{props.size}</b></div>
            </Link>

        </article>
    )
}