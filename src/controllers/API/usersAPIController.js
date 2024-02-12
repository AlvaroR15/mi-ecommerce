const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../../database/models/index');
const pictureDefault = '../uploads/users/user';

const usersController = {
    register: async (req, res) => {
        try {
            let resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.status(422).json({
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            };
            const file = req.file;
            const newUser = await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                addres: req.body.addres,
                country: req.body.country,
                password: bcrypt.hashSync(req.body.password, 10),
                // password: req.body.password,
                picture: file ? file.filename : pictureDefault
            })
            return res.status(200).json({
                meta: {
                    success: true,
                    status:200,
                    msg: 'User created succefully'
                },
                newUser
            })
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Ha ocurrido un error'
                },
                error
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({ where: { email } });

            if (!user) {
                return res.render('./users/login', {
                    errors: {
                        email: { msg: 'Este email no está registrado.' }
                    }
                })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.render('./users/login', {
                    errors: {
                        email: { msg: 'Las credenciales que pusiste son inválidas.' }
                    }
                })
            };

            req.session.userLogged = user.email;
            if (req.body.remember) {
                res.cookie('userLogged', req.session.userLogged, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/users/profile');
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    },
    edit: async (req, res) => {
        try {
            const userToUpdate = await db.User.findOne({ where: { email: req.session.userLogged } });
            let dataFile = req.file;
            let userFile;
            if (dataFile) {
                userFile = dataFile.filename;
            } else {
                userFile = userToUpdate.profilePicture;
            }

            await db.User.update({
                fullname: req.body.fullname,
                password: bcrypt.hashSync(req.body.password, 10),
                profilePicture: userFile
            }, { where: { id: userToUpdate.id } });

            res.redirect('/users/profile')

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
module.exports = usersController;