import { BoxInput } from "./BoxInput/BoxInput";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const EditUser = () => {
    const {user } = useAuth();
    const navigate = useNavigate();


    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [addres, setAddres] = useState(user.adress);
    const [country, setCountry] = useState(user.country);

    const update = async (e) => {
        e.preventDefault();
        try {
            axios.put('http://localhost:3099/api/users/edit', {
                firstName,
                lastName,
                addres,
                country
            });
        } catch(error) {
            console.log(error);
        }
        setTimeout(() => {
            navigate('/profile')
        }, 500);
    }

    return (
        <form onSubmit={update} encType="multipart/form-data">
            <BoxInput type="text" name="firstName" placeholder="Ingresa tu nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <BoxInput type="text" name="lastName" placeholder="Ingresa tu apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <BoxInput type="text" name="addres" placeholder="Ingresa tu dirección" value={addres} onChange={(e) => setAddres(e.target.value)} />
            <BoxInput type="text" name="country" placeholder="Ingresa tu país" value={country} onChange={(e) => setCountry(e.target.value)} />
            <button type="submit" className="boton-primario">Actualizar mis datos</button>
            <button className="boton-secundario"><Link to="/profile">Volver</Link></button>
        </form>
    );
};
