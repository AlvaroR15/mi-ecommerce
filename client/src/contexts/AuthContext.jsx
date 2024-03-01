import React, {createContext,useContext,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userServices";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [user,setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [isLogged, setIslogged] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const login = async (email,password) => {
        try {
            await axios.post('http://localhost:3099/api/users/login', {
                email,
                password
            });
            setIslogged(true);
            setTimeout(() => {
                navigate('/profile')
            }, 400)
        } catch(error) {
            console.log(error);
        }
    }

    const getDataUser = async () => {
        try {
            const response = await getUser();
            const user = response.user;
            const meta = response.meta;

            setStatus(meta.status);

            setUser({
                fullname: user.fullname,
                email: user.email,
                addres: user.addres,
                country: user.country,
                picture: user.picture
            })

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

    return (
        <AuthContext.Provider value={{user,login,logout,getDataUser, isLogged, status}}>
            {props.children}
        </AuthContext.Provider>
    )


}