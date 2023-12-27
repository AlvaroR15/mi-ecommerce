import Row from "./Row";
import { getInfo } from "../../../services/generalService";
import React, { Component } from "react";


class Table extends Component {
    
    constructor(){
        super()
        this.state = {
            categorias: []
        }
    }

    async componentDidMount() {
        const response = await getInfo();
        const categoryCounts = response.CategoryCounts;
        const categorias = Object.keys(categoryCounts).map((categoria) => ({
            titulo: categoria,
            cantidad: categoryCounts[categoria]
        }));
        this.setState({ categorias });
        console.log(categorias);
    }
    
    render() {
        return (
            <div className="container-fluid">
                <table className="transition-all ease-in bg-white table table-responsive-sm w-100 border border-gray-800 mx-auto text-center rounded rounded-xl hover:shadow-lg hover:shadow-slate-200 mb-4">
                    <thead>
                        <tr>
                            <th className="text-gray-900">Categoría</th>
                            <th className="text-gray-900">N° de productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categorias.map((categoria, index) => (
                            <Row key={index} categoria={categoria} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
    
export default Table;