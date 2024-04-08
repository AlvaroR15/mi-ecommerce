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

router.get('/cart', productAPIController.cart);

router.get('/',productAPIController.list);

router.get('/:id', productAPIController.detail);


router.post('/create', upload.single('image'), productAPIController.saveProduct);

router.post('/add', productAPIController.addCart);

router.post('/delete-cart', productAPIController.deleteCart);

router.put('/edit/:id', upload.single('image'),productAPIController.editProduct);

router.post('/search', productAPIController.searchProduct)

router.delete('/:id', productAPIController.deleteProduct);

module.exports = router;