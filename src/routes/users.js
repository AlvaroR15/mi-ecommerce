const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const validationUser = require('../middlewares/validationUser');


const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/img/users'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/profile', authMiddleware,usersController.profile);
router.get('/profile/edit',authMiddleware,usersController.editView)
router.put('/profile/edit', upload.single('profilePicture'),usersController.edit);

router.get('/register', guestMiddleware,usersController.registerView);
router.post('/register', upload.single('profilePicture'), validationUser,usersController.register);

router.get('/:id/myProducts',productsController.listadoProductosUsuario);

router.get('/login', guestMiddleware,usersController.loginView);
router.post('/login', validationUser,usersController.login);

router.get('/logout', usersController.logout);

module.exports = router;