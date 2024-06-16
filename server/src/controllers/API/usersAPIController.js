const { validationResult } = require('express-validator');
const { User } = require('../../database/models/index');
const bcrypt = require('bcryptjs');
const pictureDefault = '/uploads/users/user.webp';

// Controller for user-related operations
const usersController = {
    // Method to register a new user
    register: async (req, res) => {
        try {
            // Validate incoming request data
            let resultValidation = validationResult(req);
            if (!resultValidation.isEmpty()) {
                return res.status(422).json({
                    meta: {
                        success: false,
                        status: 422,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    }
                });
            }

            // Check if file is attached to request for user picture
            const file = req.file;
            // Create new user in database
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                addres: req.body.addres,
                country: req.body.country,
                password: bcrypt.hashSync(req.body.password, 10),
                picture: file ? file.filename : 'user.webp'
            });

            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'User created successfully'
                }
            });
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'An error occurred during user registration'
                },
                error: error.message
            });
        }
    },

    // Method to login a user
    login: async (req, res) => {
        try {
            // Extract email and password from request body
            const { email, password } = req.body;
            // Find user in database based on email
            const user = await User.findOne({ where: { email: email } });

            // If user does not exist, return error
            if (!user) {
                return res.status(422).json({
                    meta: {
                        success: false,
                        status: 422,
                        errors: {
                            email: {msg: 'Este email no está registrado.'}
                        }
                    },
                });
            }

            // Validate password
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    meta: {
                        success: false,
                        status: 401,
                        errors: {
                            password: {msg: 'Las credenciales que pusiste son inválidas.'}
                        }
                    }
                });
            }

            // Store user's email in session to indicate login status
            req.session.userLogged = user.email;
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'User logged in successfully'
                },
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: req.session.userLogged,
                    addres: user.addres,
                    country: user.country
                }
            });

        } catch (error) {
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'An error occurred during login'
                },
                error: error.message
            });
        }
    },

    // Method to retrieve user profile
    profile: async (req, res) => {
        try {
            // Check if user is logged in
            if (!req.session.userLogged) {
                return res.status(403).json({
                    meta: {
                        success: false,
                        status: 403,
                        msg: 'There is no registered user'
                    }
                });
            }

            // Find user in database based on email stored in session
            const findUser = await User.findOne({
                attributes: ['id', 'firstName', 'lastName', 'email', 'addres', 'country', 'picture'],
                where: { email: req.session.userLogged }
            });

            // If user exists, return user profile
            if (findUser) {
                return res.status(200).json({
                    meta: {
                        success: true,
                        status: 200,
                        msg: 'Registered user found'
                    },
                    user: {
                        firstName: findUser.firstName,
                        lastName: findUser.lastName,
                        email: findUser.email,
                        adress: findUser.addres,
                        country: findUser.country,
                        picture: findUser.picture ? `${req.protocol}://${req.get('host')}/uploads/users/${findUser.picture}` : `${req.protocol}://${req.get('host')}${pictureDefault}`
                    }
                });
            }
        } catch (error) {
            console.error('Error during profile retrieval:', error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'An error occurred during profile retrieval'
                },
                error: error.message
            });
        }
    },
    // Method to Edit User
    editDataUser: async (req, res) => {
        // Check if user is logged in
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

            const user = await User.findOne({where: {email: req.session.userLogged}});
            // Captures the data of inputs form
            const { firstName, lastName, addres, country } = req.body;
            // Set data of inputs form in the user
            await User.update({
                firstName: firstName,
                lastName: lastName,
                addres: addres,
                country: country,
            }, { where: { id: user.id} });
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'User edited successfully'
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    editPhotoUser: async (req,res) => {
        if (req.file) {
            try {
                await User.update({
                    picture: req.file.filename
                }, {
                    where: {email: req.session.userLogged}
                })
                const userEdited = await User.findOne({where: {email: req.session.userLogged}})
                return res.status(200).json({
                    meta: {
                        success: true,
                        status: 200,
                        msg: 'User picture edited successfully'
                    },
                    data: userEdited
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    meta: {
                        success: false,
                        status: 500,
                        msg: 'An error occurred during the picture editing'
                    }
                })
            }
        }
        

    },

    // Method to logout user
    logout: (req, res) => {
        try {
            // Destroy user session
            req.session.destroy();
            return res.status(200).json({
                meta: {
                    success: true,
                    status: 200,
                    msg: 'User logged out successfully'
                }
            });
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(500).json({
                meta: {
                    success: false,
                    status: 500,
                    msg: 'An error occurred during logout'
                },
                error: error.message
            });
        }
    }
};

module.exports = usersController;
