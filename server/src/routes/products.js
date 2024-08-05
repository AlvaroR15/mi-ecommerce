const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const productAPIController = require('../controllers/API/productAPIController.js');
const verifyToken = require('../middlewares/verifyTokenMiddleware.js');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../uploads/products'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/cart', verifyToken,productAPIController.cart);

router.get('/list',productAPIController.list);

router.get('/latest', productAPIController.lastProducts);

router.get('/offer', productAPIController.productOnOffer);

router.get('/:id', productAPIController.detail);


router.post('/create', upload.single('image'), productAPIController.saveProduct);

router.post('/add', verifyToken,productAPIController.addCart);

router.delete('/delete-cart', productAPIController.deleteCart);

router.put('/edit/:id', upload.single('image'),productAPIController.editProduct);

router.post('/search', productAPIController.searchProduct)

router.delete('/:id', productAPIController.deleteProduct);

module.exports = router;