import './authForm.css'; // Import the CSS stylesheet for the authentication form
import { BoxInput } from "./BoxInput/BoxInput"; // Import the BoxInput component for form fields
import axios from 'axios'; // Import axios for making HTTP requests
import { useEffect, useState } from "react"; // Import React hooks
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for routing

// Register component
export const Register = () => {
    // State hooks for form inputs and validation errors
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState(); // File input for profile picture
    const [errors, setErrors] = useState({}); // Object for storing validation errors
    const [oldData, setOldData] = useState({}); // Object for storing previous form data

    const navigate = useNavigate(); // Hook for navigation

    // Effect to pre-fill form with old data if available
    useEffect(() => {
        if (Object.keys(oldData).length > 0) {
            setFirstName(oldData.firstName || '');
            setLastName(oldData.lastName || '');
            setEmail(oldData.email || '');
            setAddres(oldData.addres || '');
            setCountry(oldData.country || '');
        }
    }, [oldData]);

    // Handle form submission
    const store = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('addres', addres);
        formData.append('country', country);
        formData.append('password', password);
        formData.append('picture', picture);
        try {
            await axios.post('http://localhost:3099/api/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Specify form data content type
                }
            });
            navigate('/login'); // Redirect to login page on successful registration

        } catch (error) {
            if (error.response.data.meta.status === 422) {
                console.log(error.response);
                setErrors(error.response.data.meta.errors); // Set validation errors
                setOldData(error.response.data.meta.oldData); // Set old data to repopulate form
            }
            console.log(error);
        }
        // Clear form fields after submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddres('');
        setCountry('');
        setPassword('');
    }

    return (
        <form method="POST" onSubmit={store} encType={'multipart/form-data'}>
            <BoxInput type="text" name="firstName" placeholder='Enter your first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {errors.firstName && <span className="error-msg">{errors.firstName.msg}</span>}
            
            <BoxInput type='text' name='lastName' placeholder='Enter your last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {errors.lastName && <span className="error-msg">{errors.lastName.msg}</span>}
            
            <BoxInput type='email' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error-msg">{errors.email.msg}</span>}
            
            <BoxInput type='text' name='addres' placeholder='Enter your address' value={addres} onChange={(e) => setAddres(e.target.value)} />
            {errors.addres && <span className="error-msg">{errors.addres.msg}</span>}
            
            <BoxInput type='text' name='country' placeholder='Enter your country' value={country} onChange={(e) => setCountry(e.target.value)} />
            {errors.country && <span className="error-msg">{errors.country.msg}</span>}
            
            <BoxInput type='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className="error-msg">{errors.password.msg}</span>}
            
            <BoxInput type='file' name='picture' onChange={(e) => { setPicture(e.target.files[0]); }} />
            {errors.picture && <span className="error-msg">{errors.picture.msg}</span>}
            
            <button type="submit" className="boton-primario">Create Account</button>
            <span className='span-question'>
                Already have an account? <Link to='/login'>Log in here!</Link>
            </span>
        </form>
    );
}
