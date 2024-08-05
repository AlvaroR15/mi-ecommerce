import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userServices";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIslogged] = useState(false);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getUser();
                if (response && response.user) {
                    setUser(response.user);
                    setIslogged(true);
                } else {
                    setIslogged(false);
                }
            } catch (error) {
                setIslogged(false);
                console.log(error);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3099/api/users/login', {
                email,
                password
            }, { 
                mode: 'cors',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.meta.status === 200) {
                setIslogged(true);
                setUser(response.data.user);
                setTimeout(() => {
                    navigate('/profile');
                }, 400);
                return response.data.user;
            }
        } catch (error) {
            throw error;
        }
    };

    const getDataUser = async () => {
        try {
            const response = await getUser();
            const user = response.user;
            // const meta = response.meta;

            // setStatus(meta.status);

            setUser({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                adress: user.adress,
                country: user.country,
                picture: user.picture
            });
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3099/api/users/logout', {}, { withCredentials: true });
            setTimeout(() => {
                setUser(null);
                setIslogged(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const editPhoto = async (picture) => {
        const data = new FormData();
        data.append('picture', picture);
        try {
            const response = await axios.put('http://localhost:3099/api/users/editPhoto', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true // Asegúrate de incluir las cookies
            });
            if (response.data.meta.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getDataUser, isLogged, status, editPhoto }}>
            {props.children}
        </AuthContext.Provider>
    );
};
