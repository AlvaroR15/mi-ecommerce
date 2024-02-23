import { BoxInput } from "./BoxInput/BoxInput";
import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3099/api/users/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                addres: addres,
                country: country,
                password: password
            }, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
        } catch(error) {
            console.log(error);
        }
        setFirstName('');
        setLastName('');
        setEmail('')
        setAddres('')
        setCountry('')
        setPassword('');
        e.preventDefault();

        navigate('/login')
    }

    return (
        <form onSubmit={store}>
            <BoxInput type="text" name="firstName" placeholder='Ingresa tu nombre'  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <BoxInput type='text' name='lastName' placeholder='Ingresa tu apellido'  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <BoxInput type='email' name='email' placeholder='Ingresa tu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <BoxInput type='text' name='addres' placeholder='Ingresa tu dirección' value={addres} onChange={(e) => setAddres(e.target.value)}/>
            <BoxInput type='text' name='country' placeholder='Ingresa tu país' value={country} onChange={(e) => setCountry(e.target.value)}/>
            <BoxInput type='password' name='password' placeholder='Ingresa tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="boton-primario">¡Crear cuenta!</button>
            <span className='span-question'>
                ¿Ya tenés cuenta? <Link to='/login'>¡Iniciá sesión acá!</Link>
            </span>
        </form>
    );
}