import { BoxInput } from "./BoxInput/BoxInput"

export const Login = () => {
    return (
        <form action="">
            < BoxInput for='email' type='email' placeholder='Ingresa tu correo' />
            < BoxInput for='password' type='password' placeholder='Ingresa tu contraseña' />
            <button type="submit" className="boton-primario">Iniciar sesión</button>
            <span className='span-question'>
                ¿No tenés cuenta? <a href="#">¡Registrate acá!</a>
            </span>
        </form>
    )
}