const Cart = require('../models/cart');

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { userId, foodItemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart for the user
      const newCart = new Cart({ userId, items: [{ foodItemId, quantity }] });
      await newCart.save();
    } else {
      // If cart exists, add the item to the cart or update the quantity if already present
      const itemIndex = cart.items.findIndex(item => item.foodItemId === foodItemId);

      if (itemIndex === -1) {
        cart.items.push({ foodItemId, quantity });
      } else {
        cart.items[itemIndex].quantity += quantity;
      }

      await cart.save();
    }

    res.status(200).json({ message: 'foodItem added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the item to the cart' });
  }
};

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.foodItemId', 'name price');

    res.status(200).json({ userId, items: cart.items });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving cart items' });
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, foodItemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const itemIndex = cart.items.findIndex(item => item.foodItemId === foodItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'foodItem not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'foodItem  quantity updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the cart item quantity' });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  try {
    const { userId, foodItemId } = req.params;

    const cart = await Cart.findOne({ userId });

    const itemIndex = cart.items.findIndex(item => item.foodItemId === foodItemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'foodItem not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'foodItem removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while removing the item from the cart' });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while clearing the cart' });
  }
};

module.exports = { addItemToCart, getCartItems, updateCartItemQuantity, removeItemFromCart, clearCart}
