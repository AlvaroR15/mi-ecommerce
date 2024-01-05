import zapatillas from '../../../assets/partials-img/zapatillasAdidas.jpg';
import './lastProducts.css'

export const LastProducts = () => {
    return (
        <>
        <h2 className='last-products-title'>Ultimas novedades</h2>
        <section className="last-products">
            <div>
                <img src={zapatillas} alt="" className='last-product-img'/>
                <span>Product 1</span>
                <p>$1999</p>
            </div>
            <div>
                <img src={zapatillas} alt="" className='last-product-img'/>
                <span>Product 2</span>
                <p>$1999</p>
            </div>
            <div>
                <img src={zapatillas} alt="" className='last-product-img'/>
                <span>Product 3</span>
                <p>$1999</p>
            </div>
            <div>
                <img src={zapatillas} alt="" className='last-product-img'/>
                <span>Product 4</span>
                <p>$1999</p>
            </div>
        <div className='link-view'>
            <a href="#">Ver más</a>
        </div>
        </section>
        </>
    )
}
