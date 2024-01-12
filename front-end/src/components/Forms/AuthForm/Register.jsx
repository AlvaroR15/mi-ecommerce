import { BoxInput } from "./BoxInput/BoxInput"

export const Register = () => {
    return (
        <form action="">
            < BoxInput for='first_name' type='text' placeholder='Ingresa tu nombre' />
            < BoxInput for='last_name' type='text' placeholder='Ingresa tu apellido' />
            < BoxInput for='email' type='email' placeholder='Ingresa tu correo' />
            < BoxInput for='password' type='password' placeholder='Ingresa tu contraseña' />
            <button type="submit" className="boton-primario">¡Crear cuenta!</button>
            <span className='span-question'>
                ¿Ya tenés cuenta? <a href="#">¡Iniciá sesión acá!</a>
            </span>
        </form>
    )
}