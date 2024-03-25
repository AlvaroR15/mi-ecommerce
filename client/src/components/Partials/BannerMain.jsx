import bannerMobile from '../../assets/partials-img/banner-mobile.jpg'
import bannerDesktop from '../../assets/partials-img/banner-home.png'
import './banner.css'
import { Link } from 'react-router-dom'

export const BannerMain = () => {
    return (
        <section className="carrusel">
                <Link className="container-img" to="/products">
                    <div>
                        <img className="img-mobile" src={bannerMobile} alt="Catalogo Uptown Urban"/>
                    </div>
                </Link>
            </section>
    )
}