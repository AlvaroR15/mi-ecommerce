const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models/index');


const usersController = {
    loginView: (req, res) => {
        res.render("./users/login", {
            titulo: 'Iniciá Sesión - Used Fashion',
            css: 'login'
        });
    },
    registerView: async (req, res) => {
        res.render("./users/register", {
            titulo: 'Creá tu cuenta - Used Fashion',
            css: 'login'
        });
    },
    register: async (req, res) => {
        try {
            let resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('./users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            };
                        const users = await db.User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                profilePicture: req.file.filename,
            })
            console.log('Usuario registrado con éxito:', users);
            return res.render("./users/login")
        } catch (error) {
            console.error('Error', error);
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
                res.cookie('userLogged', req.session.userLogged, {maxAge: (1000 * 60) * 60})
            }

            return res.redirect('/users/profile');
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    },
    profile: async (req, res) => {
        try {
            const user = await db.User.findOne({ where: { email: req.session.userLogged } })
            return res.render('./users/profile', { user });
        } catch (error) {
            console.log(error);
        }
    },
    logout: (req, res) => {
        res.clearCookie('userLogged');
        req.session.destroy();
        res.redirect('/')
    },
    editView: async (req, res) => {
        try {
            const user = await db.User.findOne({ where: { email: req.session.userLogged } });
            res.render("./users/edit", {
                user: user,
            });
        } catch (error) {
            console.log(error);
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