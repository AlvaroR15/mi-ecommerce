import { BoxInput } from "./BoxInput/BoxInput"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password)
    }

    return (
        <form onSubmit={handleSubmit}>
            < BoxInput type='email' placeholder='Ingresa tu correo' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            < BoxInput type='password' placeholder='Ingresa tu contraseña' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button type="submit" className="boton-primario">Iniciar sesión</button>
            <span className='span-question'>
                ¿No tenés cuenta? <Link to="/register">¡Registrate acá!</Link>
            </span>
        </form>
    )
}