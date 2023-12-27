import React from 'react'
import ActionButton from './ActionButton'
import { Link } from 'react-router-dom'

const ButtonsSection = () => {
   const botones = [
      {
         label: "Ver productos",
         icono: "fas fa-tshirt fa-2x",
         color: "red",
         ruta: "/products"
      },
      {
         label: "Ver usuarios",
         icono: "fas fa-user fa-2x",
         color: "sky",
         ruta: "/users"
      }
   ]
   return (
      <div className="row flex justify-content-center mx-auto">
         {
            Array.isArray(botones) && botones.map((boton, i) =>
               <Link to={boton.ruta} className='hover:no-underline'>
                  <ActionButton key={i + boton.label} label={boton.label.toUpperCase()} icono={boton.icono} color={boton.color} />
               </Link>)
         }
      </div>
   )
}

export default ButtonsSection
