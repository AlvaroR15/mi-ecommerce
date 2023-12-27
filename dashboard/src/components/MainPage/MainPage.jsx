import React from 'react'
import ButtonsSection from '../ActionButton/ButtonsSection'
import DataSection from '../DataSummary/DataSummarySection';
import ContentRow from '../ContentRow/ContentRow'
import Table from '../Table/CategoriesTable/Table'

const MainPage = () => {
    return (
        <div className="container-fluid">

            <h3 className="text-gray-700 font-bold p-2 text-center text-xl">Acciones</h3>
            <div className="flex flex-row">
                <ButtonsSection />
            </div>

            <h3 className="text-gray-700 font-bold p-2 text-center text-xl">Registros totales</h3>
            <DataSection />

            <h3 className="text-gray-700 font-bold p-2 text-center text-xl">Últimos registros de la Base de Datos</h3>
            <ContentRow />

            <h3 className="text-gray-700 font-bold p-2 text-center text-xl">Número de productos por categoría</h3>
            <Table />

        </div>
    )
}

export default MainPage
