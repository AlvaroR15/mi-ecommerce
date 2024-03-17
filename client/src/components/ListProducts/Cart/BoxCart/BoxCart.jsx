import './boxcart.css'

export const BoxCart = (props) => {
    return (
        <article>
            <div className='box-image'>
                <img src={props.image} alt="" />
            </div>
            <div className='info-product'>
                <h4>{props.name}</h4>
                <div>
                    <span className='unity'>{props.quantity} {`${props.quantity > 1 ? 'Unidades' : 'Unidad'}`}</span>
                    <span className="price">${props.price}</span>
                </div>
                <button>Quitar <i class="fa-solid fa-trash"></i></button>
            </div>
        </article>
    )
}