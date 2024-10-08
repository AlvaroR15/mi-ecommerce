const express = require('express');
const multer = require('multer'); // Middleware for handling multipart/form-data, used for file uploads
const path = require('path'); // Core Node.js module for handling file paths

const usersAPIController = require('../controllers/API/usersAPIController'); // Importing user API controller
const validations = require('../middlewares/validationUser');
const verifyToken = require('../middlewares/verifyTokenMiddleware');

const router = express.Router(); // Creating an instance of Express Router

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/users'), // Destination directory for uploaded files
    filename: (req, file, cb) => { // Function to determine the filename of the uploaded file
        cb(null, Date.now() + path.extname(file.originalname)); // Filename is a timestamp with the original file extension
    }
});

const upload = multer({ storage }); // Initializing multer middleware with the defined storage configuration

// Define routes for user-related API endpoints
router.get('/profile', verifyToken,usersAPIController.profile);
router.post('/register', upload.single('picture'), validations, usersAPIController.register);
router.post('/login',validations, usersAPIController.login);
router.put('/edit',  verifyToken,usersAPIController.editDataUser);
router.put('/editPhoto', verifyToken,upload.single('picture'), usersAPIController.editPhotoUser);
router.post('/logout', verifyToken,usersAPIController.logout);

module.exports = router;