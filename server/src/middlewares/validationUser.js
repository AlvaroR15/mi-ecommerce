const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models/index');

const validations = [
    // Validacion para el nombre de usuario
    body('fullname').notEmpty().withMessage('El nombre no puede estar vacío.').bail()
    .isLength({min:5}).withMessage('El nombre y apellido deber ser mínimo 5 caracteres.'),

    // Validacion para el email
    body('email').notEmpty().withMessage('El email no puede estar vacío.').bail()
    .isEmail().withMessage('El formato de correo es inválido.').bail()
    .custom(async email => {
        const existingUser = await db.User.findOne({where:{email:email}});
        if (existingUser) {
            throw new Error('Este email ya está registrado.')
        } else return true;
    }),

    // Validacion para la contraseña
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía.').bail()
    .isLength({min:8}).withMessage('La contraseña debe tener mínimo 8 caracteres').bail()
    // .matches() agrupa las condionces para la contrasña
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial.'),

    // Validacion para la foto
    body('profilePicture').custom((value, {req}) => {
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

module.exports = validations