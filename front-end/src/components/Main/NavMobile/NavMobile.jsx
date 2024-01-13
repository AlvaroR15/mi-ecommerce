import './navMobile.css';
import user from '../../../assets/partials-img/usuarionormal.jpg'

import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const NavMobile = (props) => {
    const nav = useRef();
    const changeClass = () => {
        nav.current.classList.toggle('show')
    }
    return (
        <>
            <nav ref={nav} className={`nav-mobile-container ${props.clicked ? 'show': ''}`}>
                <span onClick={changeClass} className='close-nav'>X</span>
                <div className="info-user">
                    <img src={user} alt="user" />
                    <p>Username</p>
                </div>
                <ul className="nav-bar">
                    <li><Link to='/'>Inicio</Link></li>
                    <li><a to="#">Buscar</a></li>
                    <li><Link to='/cart'>Carrito de compras</Link></li>
                    <li><a to="#">Favoritos</a></li>
                    <li><a to="#">Promos</a></li>
                    <li><a to="#">Ayuda</a></li>
                    <li><a to="#">Botón de arrepentimiento</a></li>
                </ul>
                <ul className="login-bar">
                    <li><Link to='/register'>Registrate</Link></li>
                    <li><Link to='/login'>Inicia sesión</Link></li>
                    <li><Link to='/'>Cerrar sesión</Link></li>
                </ul>
            </nav>
        </>
    )
}