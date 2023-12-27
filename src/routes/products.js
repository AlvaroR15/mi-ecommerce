const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const validationCreateProduct = require('../middlewares/validationCreateProduct');
const validationEditProduct = require('../middlewares/validationEditProduct');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/img/products'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/cart', authMiddleware,productsController.carrito);
router.get('/create/', authMiddleware,productsController.crearProducto);  

// ***** RUTAS DEL CRUD *****
// *** rutas para OBTENER PRODUCTOS ***
router.get('/',productsController.listadoProductos);
router.get('/item/:id', productsController.item);
router.get('/:category', productsController.productosPorCategoria);

// *** rutas para AGREGAR PRODUCTOS ***
router.post('/', upload.single('imagen'), validationCreateProduct,productsController.guardarProducto);

// *** rutas para EDITAR PRODUCTOS ***
router.get('/edit/:id/', authMiddleware,productsController.editarProducto);
router.put('/edit/:id/', upload.single('imagen'), validationEditProduct,productsController.actualizarProducto);

/* Ruta para BUSCAR PRODUCTOS */
router.post('/search', productsController.buscarProducto)

// *** rutas para BORRAR PRODUCTOS ***
router.delete('/:id', productsController.borrarProducto);


module.exports = router;