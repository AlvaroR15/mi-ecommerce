import React from 'react'
import ProductsTable from '../Table/ProductsTable/ProductsTable'
import { Link } from 'react-router-dom'

const ProductsList = () => {
    return (
        <div className='container-fluid'>
            <div className="mb-4">
                <h1 className="font-black text-gray-900 inline">Lista de Productos</h1>
                <Link to="/" className='m-3 inline text-gray-600'>Volver al inicio</Link>
            </div>
            <ProductsTable />
        </div>
    )
}

export default ProductsList
