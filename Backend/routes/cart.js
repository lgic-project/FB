const express = require('express');
const {addItemToCart, getCartItems, updateCartItemQuantity, removeItemFromCart, clearCart} = require('../controllers/cart');
const router = express.Router();

router.post('/add', addItemToCart);
router.get('/:userId', getCartItems);
router.put('/:userId/:foodItemId', updateCartItemQuantity);
router.delete('/:userId/:foodItemId', removeItemFromCart);
router.delete('/:userId/clear', clearCart);

module.exports = router;
