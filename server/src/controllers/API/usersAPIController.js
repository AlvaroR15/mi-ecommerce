const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require('../../database/models/index');
const pictureDefault = '/uploads/users/user.webp';

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
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                addres: req.body.addres,
                country: req.body.country,
                password: bcrypt.hashSync(req.body.password, 10),
                picture: file ? file.filename : null
            })
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'User created succefully'
                }
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
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(422).json({
                    meta: {
                        success: false,
                        status: 422,
                    },
                    msg: 'Este correo no se encuentra registrado.'
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    meta: {
                        success: false,
                        status: 401
                    },
                    msg: 'Contraseña incorrecta.'
                })
            };

            req.session.userLogged = user.email;
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'Usuario logueado correctamente'
                },
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: req.session.userLogged,
                    addres: user.addres,
                    country: user.country
                },
                emailSession: req.session.userLogged
            });

        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    },
    profile: async (req, res) => {
        try {
            if (!req.session.userLogged) {
                return res.status(403).json({
                    meta: {
                        success: false,
                        status: 403,
                        msg: 'There is no registered user'
                    }
                })
            }
            const findUser = await User.findOne({
                attributes: ['id','firstName','lastName','email','addres','country', 'picture'],
                where: { email: req.session.userLogged }
            });
            
            if (findUser) {
                return res.status(200).json({
                    meta: {
                        success: true,
                        status: 200,
                        msg: 'Registered user found'
                    },
                    user: {
                        fullname: `${findUser.firstName} ${findUser.lastName}`,
                        email: findUser.email,
                        adress: findUser.addres,
                        country: findUser.country,
                        picture: findUser.picture ? `${req.protocol}://${req.get('host')}/uploads/users/${findUser.picture}` : `${req.protocol}://${req.get('host')}${pictureDefault}`
                    }
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'Hubo un problema'
                },
                error
            })
        }
    },
    edit: async (req, res) => {
        try {
            const userToUpdate = await User.findOne({ where: { email: req.session.userLogged } });
            let dataFile = req.file;
            let userFile;
            if (dataFile) {
                userFile = dataFile.filename;
            } else {
                userFile = userToUpdate.profilePicture;
            }

            await User.update({
                fullname: req.body.fullname,
                password: bcrypt.hashSync(req.body.password, 10),
                profilePicture: userFile
            }, { where: { id: userToUpdate.id } });

            res.redirect('/users/profile')

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        return res.status(200).json({
            meta: {
                success: true,
                status: 200,
                msg: 'User logout successfully'
            }
        })
    }
};
module.exports = usersController;