import { BoxInput } from "./BoxInput/BoxInput";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const EditUser = () => {
    const { getDataUser, user, status } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                await getDataUser();
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
                // Puedes manejar el error aquí, como redirigir al usuario a una página de error o mostrar un mensaje de error
            }
        };
        getUserData();
    }, []);

    if (status !== 200) {
        navigate('/login');
    }

    const [firstNameUpdated, setFirstNameUpdated] = useState('');
    const [lastNameUpdated, setLastNameUpdated] = useState('');
    const [emailUpdated, setEmailUpdated] = useState('');
    const [addressUpdated, setAddressUpdated] = useState('');
    const [countryUpdated, setCountryUpdated] = useState('');
    const [pictureUpdated, setPictureUpdated] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        // Agregar campos solo si han sido modificados
        if (firstNameUpdated !== user.firstName) {
            formData.append('firstName', firstNameUpdated);
        }
        if (lastNameUpdated !== user.lastName) {
            formData.append('lastName', lastNameUpdated);
        }
        if (emailUpdated !== user.email) {
            formData.append('email', emailUpdated);
        }
        if (addressUpdated !== user.adress) {
            formData.append('addres', addressUpdated);
        }
        if (countryUpdated !== user.country) {
            formData.append('country', countryUpdated);
        }
        if (pictureUpdated !== null) {
            formData.append('picture', pictureUpdated);
        }
    
        try {
            await axios.put('http://localhost:3099/api/users/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/profile');
        } catch (error) {
            console.error("Error al actualizar los datos del usuario:", error);
            // Puedes manejar el error aquí, como mostrar un mensaje de error al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <BoxInput type="text" name="firstName" placeholder="Ingresa tu nombre" value={firstNameUpdated} onChange={(e) => setFirstNameUpdated(e.target.value)} />
            <BoxInput type="text" name="lastName" placeholder="Ingresa tu apellido" value={lastNameUpdated} onChange={(e) => setLastNameUpdated(e.target.value)} />
            <BoxInput type="email" name="email" placeholder="Ingresa tu email" value={emailUpdated} onChange={(e) => setEmailUpdated(e.target.value)} />
            <BoxInput type="text" name="address" placeholder="Ingresa tu dirección" value={addressUpdated} onChange={(e) => setAddressUpdated(e.target.value)} />
            <BoxInput type="text" name="country" placeholder="Ingresa tu país" value={countryUpdated} onChange={(e) => setCountryUpdated(e.target.value)} />
            <BoxInput type="file" name="picture" onChange={(e) => setPictureUpdated(e.target.files[0])} />
            <button type="submit" className="boton-primario">Actualizar mis datos</button>
            <button className="boton-secundario"><Link to="/profile">Volver</Link></button>
        </form>
    );
};
