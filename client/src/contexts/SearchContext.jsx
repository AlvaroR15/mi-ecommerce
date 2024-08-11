import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

// Create a search context
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// Search context provider component
export const SearchProvider = (props) => {
    // State to store search results
    const [productsFound, setProductsFound] = useState(null);
    // State to control the search status
    const [control, setControl] = useState(false);
    // State to store any search messages
    const [msg, setMsg] = useState('');

    // Configure axios to include credentials with all requests
    axios.defaults.withCredentials = true;

    // Function to perform a search based on the input text
    const search = async (textInput) => {
        try {
            // Send a POST request to search for products
            const productsData = await axios.post('http://localhost:3099/api/products/search', { search: textInput });
            const { data } = productsData.data;
            setProductsFound(data);
            // Clear the message if products are found
            if (data.length > 0) {
                setMsg('');
            }
        } catch (error) {
            console.log(error);
            let { response } = error;
            // Set an error message if no products are found
            if (response && response.data.meta.status === 404) {
                setMsg('No results found for ' + textInput);
            }
        }
        // Update the control state to indicate search completion
        setControl(true);
    };

    // Provide search state and methods to child components
    return (
        <SearchContext.Provider value={{ productsFound, search, msg, control, setControl }}>
            {props.children}
        </SearchContext.Provider>
    );
};
