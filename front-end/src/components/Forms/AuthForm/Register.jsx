import { BoxInput } from "./BoxInput/BoxInput";
import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    const placeholders = ['nombre','apellido','email','dirección','pais','contraseña'];

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const states = [firstName,lastName,email,addres,country,password];
    const setStates = [setFirstName, setlastName, setEmail, setAddres, setCountry,setPassword];

    const store = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3099/api/users/create', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            addres: addres,
            country: country,
            password: password
        })
    }
    return (
        <form onSubmit={store}>
            {
                placeholders.map((value, i) => (
                    <BoxInput 
                        type={`${value === 'email' ? 'email' : 'text'}`}
                        placeholder={`Ingresa tu ${value}`}
                        value={states[i]}
                        onChange={(e) => setStates[i](e.target.value)}
                    />
                ))
            }
            <button type="submit" className="boton-primario">¡Crear cuenta!</button>
            <span className='span-question'>
                ¿Ya tenés cuenta? <Link to='/login'>¡Iniciá sesión acá!</Link>
            </span>
        </form>
    )
}