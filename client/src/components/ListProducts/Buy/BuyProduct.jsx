import { useAuth } from '../../../contexts/AuthContext';
import './buyProduct.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BuyProduct = () => {
    const {isLogged} = useAuth();
    const navigate = useNavigate() ;

    useEffect(() => {
        if (!isLogged) {
            navigate('/login')
        }
    },[isLogged, navigate])
    if(!isLogged) return null
    
    return (
        <section className="buy-container">
            <h2 className='title-buy'>Producto comprado con éxito</h2>
            <label class="container-check">
                <input type="checkbox" checked="checked" />
                <div class="checkmark"></div>
            </label>
    
        </section>
    )
}
