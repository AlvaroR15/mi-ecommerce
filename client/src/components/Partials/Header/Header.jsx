import logo from '../../../assets/partials-img/Logo.png'
import './header.css'
import { NavMobile } from '../../Main/NavMobile/NavMobile';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import { useSearch } from '../../../contexts/SearchContext';

export const Header = () => {
    const { search, setControl } = useSearch();
    const input = useRef('');

    const [clicked, setCliked] = useState(false);
    const [value, setValue] = useState(''); // Inicializa como cadena vacía
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = () => {
        setCliked(!clicked);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!value.trim() || value === '') { // Verificar si el campo de búsqueda está vacío o contiene solo espacios en blanco
            setErrorMessage('Por favor, ingresa un término de búsqueda válido.');
            return;
        }
        setErrorMessage(''); // Limpiar el mensaje de error si el campo de búsqueda no está vacío
        try {
            await search(value);
        } catch(error) {
            // Manejar error si es necesario
        }
    }

    const reload = () => {
        setControl(false);
        input.current.value = '';
        setValue(''); // Reinicia el valor de la búsqueda
    }

    return (
        <header>
            <NavMobile clicked={clicked} handleClick={handleClick} />
            <nav>
                <div className="nav-mobile">
                    <div>
                        <Link to='/' onClick={reload}><img className="header-logo" src={logo} alt="Logo de la marca" /></Link>
                        <div>
                            <Link to='/cart'><i className="fa-solid fa-cart-shopping"></i></Link>
                            <i onClick={handleClick} className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Buscar..." onChange={(e) => setValue(e.target.value)} ref={input} />
                        <button type='submit' className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </nav>
        </header>
    )
}
