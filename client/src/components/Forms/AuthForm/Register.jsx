import './authForm.css'
import { BoxInput } from "./BoxInput/BoxInput";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState();
    const [errors, setErrors] = useState({});
    const [oldData, setOldData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(oldData).length > 0) {
            setFirstName(oldData.firstName || '');
            setLastName(oldData.lastName || '');
            setEmail(oldData.email || '');
            setAddres(oldData.addres || '');
            setCountry(oldData.country || '');
        }
    }, [oldData]);

    const store = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('addres', addres);
        formData.append('country', country);
        formData.append('password', password);
        formData.append('picture', picture);
        try {
            await axios.post('http://localhost:3099/api/users/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            navigate('/login')

        } catch (error) {
            if(error.response.data.meta.status === 422) {
                console.log(error.response);
                setErrors(error.response.data.meta.errors);
                setOldData(error.response.data.meta.oldData);
            }
           console.log(error);
        }
        setFirstName('');
        setLastName('');
        setEmail('')
        setAddres('')
        setCountry('')
        setPassword('');
    }

    return (
        <form method="POST" onSubmit={store} encType={'multipart/form-data'}>
            <BoxInput type="text" name="firstName" placeholder='Ingresa tu nombre' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {errors.firstName && <span className="error-msg">{errors.firstName.msg}</span>}
            <BoxInput type='text' name='lastName' placeholder='Ingresa tu apellido' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {errors.lastName && <span className="error-msg">{errors.lastName.msg}</span>}

            <BoxInput type='email' name='email' placeholder='Ingresa tu email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error-msg">{errors.email.msg}</span>}

            <BoxInput type='text' name='addres' placeholder='Ingresa tu dirección' value={addres} onChange={(e) => setAddres(e.target.value)} />
            {errors.addres && <span className="error-msg">{errors.addres.msg}</span>}

            <BoxInput type='text' name='country' placeholder='Ingresa tu país' value={country} onChange={(e) => setCountry(e.target.value)} />
            {errors.country && <span className="error-msg">{errors.country.msg}</span>}

            <BoxInput type='password' name='password' placeholder='Ingresa tu contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className="error-msg">{errors.password.msg}</span>}

            <BoxInput type='file' name='picture' onChange={(e) => { setPicture(e.target.files[0]); }} />
            {errors.picture && <span className="error-msg">{errors.picture.msg}</span>}

            <button type="submit" className="boton-primario">¡Crear cuenta!</button>
            <span className='span-question'>
                ¿Ya tenés cuenta? <Link to='/login'>¡Iniciá sesión acá!</Link>
            </span>
        </form>
    );
}