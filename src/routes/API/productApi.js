const express = require('express');
const productAPIController = require('../../controllers/API/productAPIController.js');
const router = express.Router();

router.get('/products', productAPIController.products);
router.get('/products/:id', productAPIController.product);

module.exports = router;