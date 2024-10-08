const { validationResult } = require('express-validator');
const { User } = require('../../database/models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { succesResponse, errorResponse, userProfileResponse } = require('../../utils/responseHelpers');
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

            return res.status(200).json(succesResponse(null, 'User created successfully'));
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json(errorResponse('An error ocurred during user registration',error));
        }
    },

    // Method to login a user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
    
            if (!user) {
                return res.status(422).json({
                    meta: {
                        success: false,
                        status: 422,
                        errors: {
                            email: { msg: 'Este email no está registrado.' }
                        }
                    },
                });
            }
    
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    meta: {
                        success: false,
                        status: 401,
                        errors: {
                            password: { msg: 'Las credenciales que pusiste son inválidas.' }
                        }
                    }
                });
            }
    
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
    
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
    
            return res.status(200).json(succesResponse(null,'User logged successfully'));
        } catch (error) {
            return res.status(500).json(errorResponse('An error ocurred during login'));
        }
    },

    // Method to retrieve user profile
    profile: async (req, res) => {
        try {
            const userId = req.user.id;
    
            const response = await userProfileResponse(userId, req, pictureDefault);
    
            // Send the response to the client
            return res.status(response.meta.status).json(response);
        } catch (error) {
            console.error('Error during profile retrieval:', error);
            return res.status(500).json(errorResponse('An error occurred during profile retrieval',error));
        }
    },
    // Method to Edit User
    editDataUser: async (req, res) => {
        // Check if user is logged in
        try {
            const userId = req.user.id;
            // Captures the data of inputs form
            const { firstName, lastName, addres, country } = req.body;
            // Set data of inputs form in the user
            await User.update({
                firstName: firstName,
                lastName: lastName,
                addres: addres,
                country: country,
            }, { where: { id: userId} });
            return res.status(200).json(succesResponse(null,'User edited successfully'))
        } catch (error) {
            return res.status(500).json(errorResponse('An error occurred during profile retrieval',error))
        }
    },
    editPhotoUser: async (req,res) => {
        if (req.file) {
            try {
                const userId = req.user.id;
                await User.update({
                    picture: req.file.filename
                }, {
                    where: {id: userId}
                })
                const userEdited = await User.findByPk(userId);
                return res.status(200).json({
                    meta: {
                        success: true,
                        status: 200,
                        msg: 'User picture edited successfully'
                    },
                    data: userEdited
                })
            } catch (error) {
                return res.status(500).json(errorResponse('An error occurred during the picture editing',error))
            }
        }
        

    },

    // Method to logout user
    logout: (req, res) => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });
            return res.status(200).json(succesResponse(null, 'User logged out successfully'));
        } catch (error) {
            return res.status(500).json(errorResponse('An error occurred during logout',error));
        }
    }
};

module.exports = usersController;
