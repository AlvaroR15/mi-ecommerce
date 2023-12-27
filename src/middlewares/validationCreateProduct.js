const path = require('path');
const { body } = require('express-validator');


const validationCreate = [
    body('nombreProd').notEmpty().withMessage('El nombre del producto no puede estar vacío.').bail()
    .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres.'),
    body('precio').notEmpty().withMessage('El precio no puede estar vacío.').bail()
    .isNumeric().withMessage('El campo solo debe contener números.'),
    body('categoria').notEmpty().withMessage('Debes seleccionar una categoria.'),
    body('talle').notEmpty().withMessage('Debes especificar un talle para el producto'),
    body('descripcion').notEmpty().withMessage('La descripción no puede estar vacía.').bail()
    .trim().isLength({min:20}).withMessage('La descripción deberá contar con al menos 20 caracteres.'),
    body('imagen').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.jpeg','.png','.gif']
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;
    })
]

module.exports = validationCreate;