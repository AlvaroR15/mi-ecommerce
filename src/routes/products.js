// const express = require("express");
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// const productsController = require('../controllers/productsController');
// const adminController = require("../controllers/Admin/adminController");

// const authMiddleware = require('../middlewares/authMiddleware');


// const storage = multer.diskStorage({
//     destination:path.join(__dirname, '../../public/img/products'), 
//     filename: (req, file, cb) =>{
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({storage});

// // router.get('/create/', authMiddleware,productsController.crearProducto);  

// router.get('/products',productsController.list);
// router.get('/products/:id', productsController.detail);

// // *** rutas para AGREGAR PRODUCTOS ***
// router.post('products/create', upload.single('picture'), adminController.saveProduct);

// // *** rutas para EDITAR PRODUCTOS ***
// router.put('/products/edit/:id', upload.single('picture'),adminController.editProduct);

// /* Ruta para BUSCAR PRODUCTOS */
// router.post('/products/search', productsController.searchProduct)

// // *** rutas para BORRAR PRODUCTOS ***
// router.delete('/products/:id', adminController.deleteProduct);


// module.exports = router;