const express = require('express');
const {addItemToCart, getCartItems, updateCartItemQuantity, removeItemFromCart, clearCart} = require('../controllers/cart');
const router = express.Router();

router.post('/add', addItemToCart);
router.get('/:userId', getCartItems);
router.put('/:userId/item/:foodItemId', updateCartItemQuantity);
router.delete('/:userId/item/:foodItemId', removeItemFromCart);
router.delete('/:userId/clear', clearCart);

module.exports = router;
