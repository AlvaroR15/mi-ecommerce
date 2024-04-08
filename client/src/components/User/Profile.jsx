import './profile.css';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Partials/Loader/Loader';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const { getDataUser, user, status } = useAuth();
    const navigate = useNavigate();

    if (status != 200) {
        navigate('/login')
    }

    useEffect(() => {
        setTimeout(() => {
            const getUser = async () => {
                await getDataUser();
            }
            getUser();
        }, 1000)
    }, []);

    if (!user) {
        return <Loader />
    }

    return (
        <main>
            <h1>Mi Perfil</h1>
            <section className="seccion-perfil-usuario">
                <div className="usuario-header">
                    <div className="usuario-caja">
                        <div className="usuario-img">
                            <img src={user.picture} alt={`${user.fullname}'s photo`} />
                            <button type="button" className="boton-img">
                                <i className="far fa-image"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="perfil-usuario-body">
                    <div className="perfil-usuario-bio">
                        <h3 className="titulo">{user.fullname}</h3>
                        <p className="text">{user.email}</p>
                        <p>{user.adress}</p>
                        <p>{user.country}</p>
                    </div>
                </div>
            </section>
            <Link to="#" className="boton-primario btn-edit">Editar mi perfil</Link>
        </main>
    )
}