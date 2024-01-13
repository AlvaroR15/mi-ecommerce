import { Inputs } from './Inputs/Inputs'
import dataService from '../../../services/dataService'
import './formProduct.css'

export const FormCreate = () => {
    return (
        <div class="container">
            <h1>Publicar producto</h1>
            <form action="/create" method="POST" enctype="multipart/form-data">
                < Inputs for='name' placeholder='Nombre' type='text' name='name' />
                < Inputs for='price' placeholder='Precio' type='number' name='price' />
                < Inputs for='size' placeholder='Talla' type='text' name='size' />
                <div>
                    <label for="category_id">Category</label>
                    <select name="category_id" required>
                        <option value='' selected disabled>Selecciona la categoría</option>
                        <option value='1'>Remeras</option>
                        <option value='2'>Camisas</option>
                        <option value='3'>Buzos/Camperas</option>
                        <option value='4'>Calzados</option>
                        <option value='5'>Pantalones</option>
                        <option value='6'>Accesorios</option>
                    </select>
                </div>


                <label for="description">Description</label>
                <textarea name="description" id="description" cols="40" rows="5" required >
                </textarea>

                < Inputs for='picture' type='file' name='picture' />

                <button type="sumbit" class="boton-primario">¡Publicar!</button>
            </form>

        </div>
    )
}