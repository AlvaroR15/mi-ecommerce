import './navMobile.css';
import user from '../../../assets/partials-img/usuarionormal.jpg'

import { useRef } from 'react';

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
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Buscar</a></li>
                    <li><a href="#">Mis compras</a></li>
                    <li><a href="#">Favoritos</a></li>
                    <li><a href="#">Promos</a></li>
                    <li><a href="#">Ayuda</a></li>
                    <li><a href="#">Botón de arrepentimiento</a></li>
                </ul>
                <ul className="login-bar">
                    <li><a href="#">Registrate</a></li>
                    <li><a href="#">Inicia sesión</a></li>
                    <li><a href="#">Cerrar sesión</a></li>
                </ul>
            </nav>
        </>
    )
}