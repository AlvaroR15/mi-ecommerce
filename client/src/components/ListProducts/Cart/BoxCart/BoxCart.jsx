import './boxcart.css'
import axios from 'axios';

export const BoxCart = (props) => {
    const deleteCart = async () => {
        await axios.post('http://localhost:3099/api/products/delete-cart')
    }
    return (
        <article className='cart-article'>
            <div className='box-image'>
                <img src={props.image} alt="" />
            </div>
            <div className='info-product'>
                <h4>{props.name}</h4>
                <div>
                    <span className='unity'>{props.quantity} {`${props.quantity > 1 ? 'Unidades' : 'Unidad'}`}</span>
                    <span className="price">${props.price}</span>
                </div>
                <button onClick={deleteCart} >Quitar <i class="fa-solid fa-trash"></i></button>
            </div>
        </article>
    )
}