import { getUser } from "../../services/userServices";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './profile.css';

export const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [country, setCountry] = useState('');
    const [picture, setPicture] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getUser();
                const user = response.user;
                const meta = response.meta;

                if (!meta.success) {
                    navigate('/login')
                }

                setName(user.fullname);
                setEmail(user.email);
                setAddres(user.addres);
                setCountry(user.country);
                setPicture(user.picture)
            } catch (error) {

            }
        };
        getData();
    }, [])

    return (
        <main>
            <h1>Mi Perfil</h1>
            <section className="seccion-perfil-usuario">
                <div className="usuario-header">
                    <div className="usuario-caja">
                        <div className="usuario-img">
                            <img src={picture} alt="Imagen de usuario" />
                            <button type="button" className="boton-img">
                                <i className="far fa-image"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="perfil-usuario-body">
                    <div className="perfil-usuario-bio">
                        <h3 className="titulo">{name}</h3>
                        <p className="text">{email}</p>
                        <p>{addres}</p>
                        <p>{country}</p>
                    </div>
                </div>
            </section>
            <a href="/users/profile/edit" className="boton-primario btn-edit">Editar mi perfil</a>
        </main>
    )
}