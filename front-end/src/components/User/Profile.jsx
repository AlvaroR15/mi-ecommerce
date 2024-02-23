import { getUser } from "../../services/userServices";
import { useState, useEffect } from "react";
import './profile.css';

export const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getData = async () => {
            const response = await getUser();
            const user = response.user;
            setName(user.firstName);
            setEmail(user.email);
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
                            <img src="" alt="Imagen de usuario" />
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
                    </div>
                </div>
            </section>
            <a href="/users/profile/edit" className="boton-primario btn-edit">Editar mi perfil</a>
        </main>
    )
}