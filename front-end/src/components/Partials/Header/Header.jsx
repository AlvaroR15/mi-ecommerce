import logo from '../../../assets/partials-img/Logo.png'
import './header.css'

export const Header = () => {
    return (
        <header>
            <nav>
                <div className="nav-mobile">
                    <div>
                        <a href="#"><img className="header-logo" src={logo} alt="Logo de la marca" /></a>
                        <div>
                            <i className="fa-solid fa-bars"></i>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                    <form>
                        <input type="text" placeholder="Buscar..." />
                        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div className="nav-md-lg">
                    <a href="#"><img className="header-logo" src={logo} alt="Logo de la marca" /></a>
                    <form action="/products/search" method="post">
                        <label>
                            <input type="text" placeholder="Buscar..." name="search" />
                            <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </label>
                    </form>
                    <ul className='navigator'>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Mis Compras</a></li>
                        <li><a href="#">❤</a></li>
                        <li><a href="#">🛒</a></li>
                    </ul>
                    <div className='nav-options'>
                        <ul className='nav-bar'>
                            <li><a href="#">Categorias</a></li>
                            <li><a href="#">Promociones</a></li>
                            <li><a href="#">Devoluciones</a></li>
                            <li><a href="#">Ayuda</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}