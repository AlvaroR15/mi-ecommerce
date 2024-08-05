import { Card } from "../Partials/Card"
import './listProducts.css'

import { listAllProducts } from "../../services/productsService";
import { useState, useEffect } from "react"

export const ListProducts = () => {
    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getInfo = async() => {
            const response = await listAllProducts(currentPage);
            setProducts(response.data);
            setTotalPages(response.meta.totalPages)
        }
        getInfo()
    }, [currentPage])

    const handlePageChange = page => {
        if (page > 0 && page <= totalPages)
        setCurrentPage(page);
    }


    return (
        <section className="list-products">
            <h2>Catálogo</h2>
            <div className="container-list-products">
                {
                    Array.isArray(products) && products.map((product,i) => (
                        <Card id={product.id} name={product.name} image={product.image} price={product.price} size={product.size} key={i} />
                    ))
                }
            </div>

        <div className="container-pagination">
            <div className="pagination">
                <button className="before" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
                ))}
                <button className="next"  onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </div>
        </section>
    )
}
