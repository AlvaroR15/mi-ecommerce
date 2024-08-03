import { BoxInput } from "./BoxInput/BoxInput"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import './authForm.css';

export const Login = ({setCurrentUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email,password);
            setCurrentUser(user);
        } catch(error) {
            if (error.response && error.response.data.meta) {
                setErrors(error.response.data.meta.errors);
                const {status, errors: responseErrors} = error.response.data.meta;
                if (status === 422 || status === 401) {
                    setErrors(responseErrors);
                }
            } 
            console.log(errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            < BoxInput type='email' placeholder='Ingresa tu correo' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            {errors.email && <span className="error-msg">{errors.email.msg}</span>}
            < BoxInput type='password' placeholder='Ingresa tu contraseña' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            {errors.password && <span className="error-msg">{errors.password.msg}</span>}
            <button type="submit" className="boton-primario">Iniciar sesión</button>
            <span className='span-question'>
                ¿No tenés cuenta? <Link to="/register">¡Registrate acá!</Link>
            </span>
        </form>
    )
}