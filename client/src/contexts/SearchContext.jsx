import React, {createContext,useContext,useState} from "react";
import axios from 'axios';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);


export const SearchProvider = (props) => {
    const [productsFound, setProductsFound] = useState(null);
    const [control, setControl] = useState(false);
    const [msg, setMsg] = useState('');

    axios.defaults.withCredentials = true;
    const search = async (textInput) => {
        try {
            const productsData = await axios.post('http://localhost:3099/api/products/search', {search: textInput});
            const { data } = productsData.data;
            setProductsFound(data);
            if (data.length > 0) {
                setMsg('')
            }
        } catch(error) {
            console.log(error);
            let {response} = error;
            if (response.data.meta.status === 404) {
                setMsg('No se encontro ' + textInput);
            }
        }
        setControl(true)
    }

    return (
        <SearchContext.Provider value={{productsFound, search, msg, control, setControl}}>
            {props.children}
        </SearchContext.Provider>
    )
}