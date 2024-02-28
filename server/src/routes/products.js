const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const productAPIController = require('../controllers/API/productAPIController.js');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../uploads/products'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});


router.get('/',productAPIController.list);
router.get('/:id', productAPIController.detail);

// *** rutas para AGREGAR PRODUCTOS ***
router.post('/create', upload.single('image'), productAPIController.saveProduct);

// rout for add products to cart
router.get('/cart', productAPIController.cart);
router.post('/add', productAPIController.addCart);

// *** rutas para EDITAR PRODUCTOS ***
router.put('/edit/:id', upload.single('image'),productAPIController.editProduct);

/* Ruta para BUSCAR PRODUCTOS */
router.post('/search', productAPIController.searchProduct)

// *** rutas para BORRAR PRODUCTOS ***
router.delete('/:id', productAPIController.deleteProduct);

module.exports = router;