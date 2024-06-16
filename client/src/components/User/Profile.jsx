import './profile.css';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Partials/Loader/Loader';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const { getDataUser, user, isLogged, editPhoto } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [msgErrorFile, setMsgErrorFile] = useState(null);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const card = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        const getUser = async () => {
            await getDataUser();
        }
        getUser();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        setIsCardVisible(!isCardVisible);
    }

    const updatePhoto = async (e) => {
        e.preventDefault();
        try {
            if (!photo) {
                setMsgErrorFile("No se cargo ningún archivo");
                return;
            } else {
                await editPhoto(photo);
                setIsCardVisible(!isCardVisible);
                setTimeout(() => {
                    window.location.reload()
                }, 500);

            }
        } catch (error) {
            setIsCardVisible("Ha ocurrido un error, recarga la página e intentalo de nuevo")
        }

    }

    if (!user) {
        return <Loader />
    }

    return (
        <main>

            {isCardVisible && (
                <div class="cardPhoto" ref={card} >
                    <span className='img-question'>¿Desea cambiar su foto de perfil?</span>
                    <form onSubmit={updatePhoto} encType={'multipart/form-data'} >
                        <label class="custum-file-upload" for="file">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                            </div>
                            <div class="text">
                                <span>Click to upload image</span>
                            </div>
                            <input type="file" id="file" name='picture' onChange={(e) => { setPhoto(e.target.files[0]) }} />
                        </label>
                        <div className='cardPhoto-buttons'>
                            <button className='cancel' onClick={handleClick}>Cancelar</button>
                            <button type='submit' className='confirm'>Confirmar</button>
                        </div>
                    </form>
                    <p style={{ padding: '10px', color: '#935' }}>{msgErrorFile ? msgErrorFile : ""}</p>
                </div>
            )}

            <section className="user-profile">
                <div className="info-user-img">
                    <img src={user.picture} alt={`${user.firstName}'s photo`} style={{ position: 'relative' }} />
                    <span className="boton-img" onClick={handleClick}>
                        <i className="far fa-image"></i>
                    </span>
                </div>
                <div className="info-user-text">
                    <div className="data-user">
                        <h3 className="fullname">{`${user.firstName} ${user.lastName}`}</h3>
                        <h4>Information</h4>
                        <p><span>Address: </span>{user.adress}.</p>
                        <p><span>Country: </span>{user.country}.</p>
                    </div>
                </div>
            </section>

            <Link to="/edit-my-profile" className="boton-primario btn-edit">Editar mi perfil</Link>
        </main>
    )
}