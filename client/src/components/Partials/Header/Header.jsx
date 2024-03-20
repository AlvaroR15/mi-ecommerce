import logo from '../../../assets/partials-img/Logo.png'
import './header.css'
import { NavMobile } from '../../Main/NavMobile/NavMobile';
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { useSearch } from '../../../contexts/SearchContext';

export const Header = () => {
    const { search, clickedInput, handleClickedInput } = useSearch()

    const [clicked, setCliked] = useState(false);
    const [value, setValue] = useState('');
    const handleClick = () => {
        setCliked(!clicked);
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        await search(value);
    }

    return (
        <header>
            < NavMobile clicked={clicked} handleClick={handleClick} />
            <nav>
                <div className="nav-mobile">
                    <div>
                        <Link to='/'><img className="header-logo" src={logo} alt="Logo de la marca" /></Link>
                        <div>
                            <Link to='/cart'><i className="fa-solid fa-cart-shopping"></i></Link>
                            <i onClick={handleClick} className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Buscar..." onChange={(e) => setValue(e.target.value)} onFocus={handleClickedInput} />
                        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div className="nav-md-lg">
                    <a to="#"><img className="header-logo" src={logo} alt="Logo de la marca" /></a>
                    <form action="/products/search" method="post">
                        <label>
                            <input type="text" placeholder="Buscar..." name="search" />
                            <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </label>
                    </form>
                    <ul className='navigator'>
                        <li><a to="#">Profile</a></li>
                        <li><a to="#">Mis Compras</a></li>
                        <li><a to="#">❤</a></li>
                        <li><a to="#">🛒</a></li>
                    </ul>
                    <div className='nav-options'>
                        <ul className='nav-bar'>
                            <li><a to="#">Categorias</a></li>
                            <li><a to="#">Promociones</a></li>
                            <li><a to="#">Devoluciones</a></li>
                            <li><a to="#">Ayuda</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}