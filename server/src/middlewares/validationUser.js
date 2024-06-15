const path = require('path');
const { body } = require('express-validator');
const { User } = require('../database/models/index');

const validations = [
    // Validacion para el nombre de usuario
    body('firstName').trim().notEmpty().withMessage('El nombre no puede estar vacío.').bail()
        .isLength({ min: 3 }).withMessage('El nombre deber ser de 3 caracteres minímo.'),

    // Validate lastname
    body('lastName').trim().notEmpty().withMessage('El apellido no puede estar vacío.').bail()
        .isLength({ min: 3 }).withMessage('El apellido debe tener minímo 3 caracteres.'),


    // Validacion para el email
    body('email').trim().notEmpty().withMessage('El email no puede estar vacío.').bail()
        .isEmail().withMessage('El formato de correo es inválido.').bail()
        .custom(async email => {
            const existingUser = await User.findOne({ where: { email: email } });
            if (existingUser) {
                throw new Error('Este email ya está registrado.')
            } else return true;
        }),


    // Validate adress
    body('addres').trim().notEmpty().withMessage('La dirección no puede estar vacía.'),


    // Validate country
    body('country').trim().notEmpty().withMessage('Debes ingresar tu país.'),

    // Validacion password
    body('password').notEmpty().withMessage('La contraseña no puede estar vacía.').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres').bail()
        // .matches() agrupa las condionces para la contrasña
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial.'),

    // Validate picture
    body('picture').custom((value, { req }) => {
        let file = req.file;
        if (file) {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', 'webp'];
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]

module.exports = validations