const express=require("express");
const router=express.Router()




const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const { getProducts } = require('../controllers/productController');
const { searchProducts } = require('../controllers/searchController');
const cartController = require('../controllers/cartController');

// User endpoints
const UserLogout = require('../controllers/UserLogout');
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', UserLogout);

// Product endpoints
router.get('/products', getProducts);

// Cart endpoints (require authentication middleware in production)
const authtoken = require('../middleware/authtoken');
router.post('/cart/add', authtoken, cartController.addToCart);
router.get('/cart', authtoken, cartController.getCart);
router.post('/cart/remove', authtoken, cartController.removeFromCart);
router.post('/cart/update', authtoken, cartController.updateCartQuantity);
router.post('/cart/clear', authtoken, cartController.clearCart);

// Search endpoint
// router.get('/search', searchProducts);

module.exports=router;