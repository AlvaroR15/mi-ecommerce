import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userServices";

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication context provider component
export const AuthProvider = (props) => {
    // State to store user information
    const [user, setUser] = useState(null);
    // State to manage login status
    const [isLogged, setIslogged] = useState(false);
    // State to manage request status
    const [status, setStatus] = useState(false);
    // Hook for navigation
    const navigate = useNavigate();

    // Configure axios to include credentials with all requests
    axios.defaults.withCredentials = true;

    // Effect to check user authentication on component mount
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

    // Function to handle user login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3099/api/users/login', {
                email,
                password
            }, { 
                mode: 'cors',
                credentials: 'include',
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

    // Function to get user data
    const getDataUser = async () => {
        try {
            const response = await getUser();
            const user = response.data.user;
            
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

    // Function to handle user logout
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

    // Function to edit user profile picture
    const editPhoto = async (picture) => {
        const data = new FormData();
        data.append('picture', picture);
        try {
            const response = await axios.put('http://localhost:3099/api/users/editPhoto', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true // Ensure cookies are included
            });
            if (response.data.meta.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Provide authentication methods and state to child components
    return (
        <AuthContext.Provider value={{ user, login, logout, getDataUser, isLogged, status, editPhoto }}>
            {props.children}
        </AuthContext.Provider>
    );
};
