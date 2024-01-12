import { Inputs } from './Inputs/Inputs'
import './formProduct.css'

export const FormCreate = () => {
    return (
        <div class="container">
            <h1>Publicar producto</h1>
            <form action="/products" method="POST" enctype="multipart/form-data">
                < Inputs for='Name' placeholder='Nombre' type='text' name='Name' />
                < Inputs for='Precio' placeholder='Precio' type='number' name='price' />
                < Inputs for='Talla' placeholder='Talla' type='text' name='talla' />
                <div>
                    <label for="categoria">Categoría</label>
                    <select id="categoria" name="categoria" required>
                        <option value="" selected disabled>Selecciona la categoría</option>
                    </select>
                </div>


                <label for="descripcion">Descripción del Producto</label>
                <textarea name="descripcion" id="descripcion" cols="40" rows="5" required >
                </textarea>

                < Inputs for='Imagen'type='file' name='talla' />

                <button type="sumbit" class="boton-primario">¡Publicar!</button>
            </form>

        </div>
    )
}