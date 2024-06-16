import React, {createContext,useContext,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userServices";

const AuthContext = createContext();
axios.defaults.withCredentials = true;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [user,setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLogged, setIslogged] = useState(false);
    const navigate = useNavigate();

    const login = async (email,password) => {
        try {
            const response = await axios.post('http://localhost:3099/api/users/login', {
                email,
                password
            }, {withCredentials: true});
            if(response.data.meta.status === 200) {
                setIslogged(true);
                setTimeout(() => {
                    navigate('/profile')
                }, 400)
            }
        } catch(error) {
            throw error;
        }
    }

    const getDataUser = async () => {
        try {
            if (isLogged) {
                const response = await getUser();
                const user = response.user;
                const meta = response.meta;
    
                setStatus(meta.status);
    
                setUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    adress: user.adress,
                    country: user.country,
                    picture: user.picture
                })
            } else {
                setUser(null);
                navigate('/login')
            }

        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        await axios.post('http://localhost:3099/api/users/logout')
        setTimeout(() => {
            setUser(null);
            setIslogged(false);
            navigate('/');
        }, 1000)
    }


    const editPhoto = async(picture) => {
        const data = new FormData();
        data.append('picture', picture);
        try {
            const response = await axios.put('http://localhost:3099/api/users/editPhoto', data, { Headers: { 'Content-Type': 'multipart/form-data' } })
            if (response.success) {
                setUser(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{user,login,logout,getDataUser, isLogged, status, editPhoto}}>
            {props.children}
        </AuthContext.Provider>
    )


}