import React from 'react'

const TopBar = () => {
    return (
        <div className="bg-white topbar p-2 mb-4 static-top shadow flex flex-row justify-center sm:justify-between">
            <img className='h-100 hidden sm:block' src="../Logo.png" alt="Logo de Uptown Urban" />
            <h1 className="pe-3 text-gray-950 font-black hidden sm:block">Administración</h1>

            {/* <!-- Título para pantallas chicas -> */}
            <h1 className="text-gray-950 font-black block sm:hidden text-lg pt-3">Administración de Uptown Urban</h1>
        </div>
    )
}

export default TopBar
