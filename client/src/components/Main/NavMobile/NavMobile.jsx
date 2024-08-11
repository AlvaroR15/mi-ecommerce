import './navMobile.css';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const NavMobile = (props) => {
    const nav = useRef();
    const overlay = useRef();
    const { getDataUser, user, isLogged, logout } = useAuth();

    const changeClass = () => {
        nav.current.classList.toggle('show');
        overlay.current.classList.toggle('show');
    }

    const closeNav = () => {
        nav.current.classList.remove('show');
        overlay.current.classList.remove('show');
    }

    useEffect(() => {
        if (isLogged) {
            const getUser = async () => {
                await getDataUser();
            }
            getUser();
        }

    }, [])

    return (
        <>
            <div ref={overlay} className="overlay" onClick={closeNav}></div>
            <nav ref={nav} className={`nav-mobile-container ${props.clicked ? 'show' : ''}`}>
                <span onClick={changeClass} className='close-nav'>X</span>
                {
                    (user != null) &&
                    <div className="info-user">
                        <img src={user.picture} alt={`${user.fullname}'s photo`} />
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                }
                <ul className="nav-bar">
                    <li><Link to='/'>Inicio</Link></li>
                    <li><Link to={`${isLogged ? '/cart' : '/login'}`}>Carrito de compras</Link></li>
                    <li><Link to="#">Favoritos</Link></li>
                    <li><Link to="#">Promos</Link></li>
                    <li><Link to="#">Ayuda</Link></li>
                </ul>
                <ul className="login-bar">
                    {
                        (!isLogged) && <li><Link to='/register'>Registrate</Link></li>
                    }
                    {
                        (!isLogged) && <li><Link to='/login'>Inicia sesión</Link></li>
                    }
                    {
                        (isLogged) && <li><Link onClick={logout}>Cerrar sesión</Link></li>
                    }
                </ul>
            </nav>
        </>
    )
}
