const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');

router.get('/products', ctrl.getProducts);
router.get('/product/:id', ctrl.getProductById);
router.post('/product', ctrl.createProduct);
router.put('/product/:id', ctrl.updateProduct);
router.delete('/product/:id', ctrl.deleteProduct);

module.exports = router;
