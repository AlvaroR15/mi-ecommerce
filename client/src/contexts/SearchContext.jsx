import React, {createContext,useContext,useState} from "react";
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);


export const SearchProvider = (props) => {
    const [productsFound, setProductsFound] = useState(null);
    const [status, setStatus] = useState(null);
    const [msg, setMsg] = useState('');
    const [clickedInput, setClikedInput] = useState(false);

    const search = async (textInput) => {
        try {
            const productsData = await axios.post('http://localhost:3099/api/products/search', textInput);
            setStatus(productsData.meta.status);
            if (status === 404) setMsg(`No se encontro a ${textInput}`)
            if (status === 200) setProductsFound(productsData.data.searchProducts)

        } catch(error) {
            console.log(error);
        }
    }

    const handleClickedInput = setClikedInput(true);

    return (
        <useSearch.Provider value={{productsFound, status, msg, search, handleClickedInput, clickedInput}}>
            {props.children}
        </useSearch.Provider>
    )
}