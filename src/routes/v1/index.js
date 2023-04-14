const express = require('express');

const router = express.Router();

const {
    createProduct, 
    getProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct
} = require('../../controller/product-controller');

router.post('/product', createProduct);
router.get('/product/:id', getProduct);
router.get('/product', getProducts);
router.delete('/product/:id', deleteProduct);
router.patch('/product/:id', updateProduct);

/*************************************************************************** */

const {
    signin,
    signup,
    deleteUser,
    updateUser,
    isAuthenticated
} = require('../../controller/user-controller');

router.post('/user/signup', signup);
router.post('/user/signin', signin);
router.delete('/user/delete/:id', deleteUser);
router.patch('/user/update/:id', updateUser);
router.get('/user/isAuthenticated', isAuthenticated);

/*************************************************************************** */

const {
    createDA,
    getDA,
    getDAs,
    updateDA,
    deleteDA
} = require('../../controller/DA-controller');

router.post('/deliveryAgent', createDA);
router.get('/deliveryAgent/:id', getDA);
router.get('/deliveryAgent', getDAs);
router.delete('/deliveryAgent/:id', deleteDA);
router.patch('/deliveryAgent/:id', updateDA);

/*************************************************************************** */

const {
    getOrderDetails,
    placeOrder,
    cancelOrder,
} = require('../../controller/order-controller');

router.get('/order/:id', getOrderDetails);
router.post('/order/place', placeOrder);
router.get('/order/cancel/:id', cancelOrder);

module.exports = router;