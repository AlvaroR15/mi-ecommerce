import { Inputs } from './Inputs/Inputs';
import './formProduct.css';
import { React, useState } from 'react';
import Axios from 'axios';



export const FormCreate = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [size,setSize] = useState('');
    const [categoryId,setCategoryId] = useState('');
    const [description,setDescription] = useState('');
    const [picture,setPicture] = useState('');

    const create = () => {
        Axios.post('http://localhost:8000/admin/create', {
            name: name,
            price: price,
            size: size,
            category_id: categoryId,
            description: description,
            picture: picture
        }).then(() => {
            alert('Producto registrado')
        })
    }

    const showData = () => {

    }

    return (
        <div class="container">
            <h1>Publicar producto</h1>
            <form action="/create" method="POST" enctype="multipart/form-data" onSubmit={create}>
                < Inputs for='name' placeholder='Nombre' type='text' name='name' onChange={(event) => {setName(event.target.value)}} />
                < Inputs for='price' placeholder='Precio' type='number' name='price' onChange={(event) => {setPrice(event.target.value)}}/>
                < Inputs for='size' placeholder='Talla' type='text' name='size' onChange={(event) => {setSize(event.target.value)}}/>
                <div>
                    <label for="category_id">Category</label>
                    <select name="category_id" required onChange={(event) => {setCategoryId(event.target.value)}}>
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
                <textarea name="description" id="description" cols="40" rows="5" required onChange={(event) => {setDescription(event.target.value)}}>
                </textarea>

                < Inputs for='picture' type='file' name='picture' onChange={(event) => {setPicture(event.target.value)}} />

                <button type="submit" class="boton-primario">¡Publicar!</button>
            </form>

        </div>
    )
}