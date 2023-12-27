import ProductRow from "./ProductRow";
import React, { Component } from "react";
import {getProducts } from "../../../services/productService";

class ProductsTable extends Component {
    constructor(){
        super()
        this.state = {
            product:[]
        }
    }
    async componentDidMount(){

        const response = await getProducts()
        this.setState({product: response})
    }

    render(){
        return (
            <div className="container-fluid">
                <table className="transition-all ease-in table table-responsive-sm bg-white w-100 border border-gray-800 mx-auto rounded rounded-xl hover:shadow-lg hover:shadow-slate-200 mb-4">
                    <thead>
                        <tr>
                            <th className="text-gray-900">ID</th>
                            <th className="text-gray-900">Imagen</th>
                            <th className="text-gray-900">Categoría</th>
                            <th className="text-gray-900">Nombre del Producto</th>
                            <th className="text-gray-900">Talle</th>
                            <th className="text-gray-900">Precio (ARS)</th>
                            <th className="text-gray-900">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(this.state.product.products) && this.state.product.products.map((producto) => <ProductRow key={producto.idProd} producto={producto} />)
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}


export default ProductsTable;