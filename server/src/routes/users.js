const express = require('express');
const multer = require('multer');
const path = require('path');

const usersAPIController = require('../controllers/API/usersAPIController');

const router = express.Router();

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../uploads/users'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/profile', usersAPIController.profile);

router.post('/register', upload.single('picture'),usersAPIController.register);
router.post('/login', usersAPIController.login);

router.get('/logout', usersAPIController.logout);

module.exports = router;