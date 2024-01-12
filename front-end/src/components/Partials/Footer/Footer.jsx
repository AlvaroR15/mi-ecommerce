import logoFooter from '../../../assets/partials-img/Logo-footer-claro.png'
import './footer.css'

export const Footer = () => {
    return (
        <footer id="footer">
            <div>
                <h2>Categorías</h2>
                <ul>
                    <li><a href="#">Remeras</a></li>
                    <li><a href="#">Buzos y Camperas</a></li>
                    <li><a href="#">Pantalones</a></li>
                    <li><a href="#">Calzado</a></li>
                    <li><a href="#">Accesorios</a></li>
                </ul>
            </div>
            <div>
                <h2>Acerca de</h2>
                <ul>
                    <li><a href="#">Used Fashion</a></li>
                    <li><a href="#">Términos y Condiciones</a></li>
                    <li><a href="#">Politica de privacidad</a></li>
                </ul>
            </div>
            <div className="logo-footer-container">
                <a href="/"><img className="logo-footer" src={logoFooter} alt="Logo de Marca"/></a>
            </div>
            <div>
                <h2>Contacto</h2>
                <ul>
                    <li className="info-contacto"><i className="fa-brands fa-whatsapp icon-footer wp"></i> 388-1234567</li>
                    <li className="info-contacto"><i className="fa-regular fa-envelope icon-footer"></i> usedfashion@gmail.com</li>
                    <li className="info-contacto"><i className="fa-solid fa-location-dot icon-footer"></i> Alvear N°123, S.S. de Jujuy, Argentina</li>
                </ul>
            </div>
            <div className="container-sociales">
                <h2>Seguinos</h2>
                <ul className="redes-sociales">
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                </ul>
            </div>
        </footer>
    )
}