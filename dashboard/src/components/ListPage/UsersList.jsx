import React from 'react'
import UsersTable from '../Table/UsersTable/UsersTable'
import { Link } from 'react-router-dom'

const UsersList = () => {
    return (
        <div className='container-fluid'>
            <div className="mb-4">
                <h1 className="font-black text-gray-900 inline">Lista de Usuarios</h1>
                <Link to="/" className='m-3 inline text-gray-600'>Volver al inicio</Link>
            </div>
            <UsersTable />
        </div>
    )
}

export default UsersList
