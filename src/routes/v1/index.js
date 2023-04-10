const express = require('express');

const {
    createProduct, 
    getProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct
} = require('../../controller/product-controller');

const router = express.Router();

router.post('/product', createProduct);
router.get('/product/:id', getProduct);
router.get('/product', getProducts);
router.delete('/product/:id', deleteProduct);
router.patch('/product/:id', updateProduct);

module.exports = router;