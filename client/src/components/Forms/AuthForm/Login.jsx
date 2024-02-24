import { BoxInput } from "./BoxInput/BoxInput"
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const login = async (e) => {
        try {
            e.preventDefault();
            axios.post('http://localhost:3099/api/users/login', {
                email : email,
                password: password
            });
        } catch(error) {
            console.log(error);
        }
        setTimeout(() => {
            navigate('/profile')
        }, 600)
    }

    return (
        <form onSubmit={login}>
            < BoxInput type='email' placeholder='Ingresa tu correo' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            < BoxInput type='password' placeholder='Ingresa tu contraseña' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button type="submit" className="boton-primario">Iniciar sesión</button>
            <span className='span-question'>
                ¿No tenés cuenta? <Link to="#">¡Registrate acá!</Link>
            </span>
        </form>
    )
}