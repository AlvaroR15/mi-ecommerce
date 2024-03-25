import './search.css';
import { Card } from '../../Partials/Card';

import { useEffect, useState } from 'react';
import { useSearch } from '../../../contexts/SearchContext';

export const Search = () => {
    const { productsFound, msg } = useSearch();


    useEffect(() => {
    }, [msg, productsFound])

    if (msg !== '') {
        return (
            <p>
                {msg}
            </p>
        )
    } else if (productsFound.length > 0) {
        return (
            <section className="list-products">
                <h2>Productos encontrados</h2>
                <div className="container-list-products">
                    {
                        Array.isArray(productsFound) && productsFound.map((product, i) => (
                            <Card id={product.id} name={product.name} image={product.image} price={product.price} size={product.size} key={i} />
                        ))
                    }
                </div>
            </section>
        )
    }
}
