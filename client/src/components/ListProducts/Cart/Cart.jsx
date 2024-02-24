import zapatillas from '../../../assets/partials-img/zapatillasAdidas.jpg'
import './cart.css'

export const Cart = () => {
    return (
        <>
            <section className='products-cart'>
                <div className='info-product'>
                    <img src={zapatillas} alt="" />
                    <div>
                        <p className='name'>Zapatillas Adidas blancas</p>
                        <span>Talle: S</span>
                    </div>
                </div>
                <div className='buttons-cart'>
                    <button className='btn delete'>Quitar</button>
                    <button className='btn modify'>Modificar</button>
                </div>
            </section>
        </>
    )
}