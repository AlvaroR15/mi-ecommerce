const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router(); // Create an Express router

// Import the product API controller and token verification middleware
const productAPIController = require('../controllers/API/productAPIController.js');
const verifyToken = require('../middlewares/verifyTokenMiddleware.js');

// Configure storage options for multer
const storage = multer.diskStorage({
    // Set the destination folder for uploaded files
    destination: path.join(__dirname, '../uploads/products'), 
    // Define the filename to include a timestamp and the original file extension
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage });

// Define route handlers

// Get user's cart, requires token verification
router.get('/cart', verifyToken, productAPIController.cart);

// Get list of products
router.get('/list', productAPIController.list);

// Get the latest products
router.get('/latest', productAPIController.lastProducts);

// Get a random product on offer
router.get('/offer', productAPIController.productOnOffer);

// Get product details by ID
router.get('/:id', productAPIController.detail);

// Create a new product with image upload
router.post('/create', upload.single('image'), productAPIController.saveProduct);

// Add a product to the user's cart, requires token verification
router.post('/add', verifyToken, productAPIController.addCart);

// Delete a product from the cart
router.delete('/delete-cart', productAPIController.deleteCart);

// Edit an existing product with optional image upload
router.put('/edit/:id', upload.single('image'), productAPIController.editProduct);

// Search for products based on user input
router.post('/search', productAPIController.searchProduct);

// Delete a product by ID
router.delete('/:id', productAPIController.deleteProduct);

// Export the router to be used in other parts of the application
module.exports = router;
