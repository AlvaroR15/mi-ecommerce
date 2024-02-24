import bannerMobile from '../../assets/partials-img/banner-mobile.jpg'
import bannerDesktop from '../../assets/partials-img/banner-home.png'
import './banner.css'

export const BannerMain = () => {
    return (
        <section className="carrusel">
                <a className="container-img" href="/products">
                    <div>
                        <img className="img-mobile" src={bannerMobile} alt="Catalogo Uptown Urban"/>
                    </div>
                    <div>
                        <img className="img-carrusel" src={bannerDesktop} alt="Catalogo Uptown Urban"/>
                    </div>
                </a>
            </section>
    )
}