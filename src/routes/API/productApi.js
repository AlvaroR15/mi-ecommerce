const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const productAPIController = require('../../controllers/API/productAPIController.js');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/img/products'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});


router.get('/products',productAPIController.list);
router.get('/products/:id', productAPIController.detail);

// *** rutas para AGREGAR PRODUCTOS ***
router.post('/products/create', upload.single('picture'), productAPIController.saveProduct);

// *** rutas para EDITAR PRODUCTOS ***
router.put('/products/edit/:id', upload.single('picture'),productAPIController.editProduct);

/* Ruta para BUSCAR PRODUCTOS */
router.post('/products/search', productAPIController.searchProduct)

// *** rutas para BORRAR PRODUCTOS ***
router.delete('/products/:id', productAPIController.deleteProduct);

module.exports = router;