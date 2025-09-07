const Cart = require('../model/Cart');

// Add product to cart (frontend sends productId and quantity)
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get cart for user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('getCart: userId =', userId);
    const cart = await Cart.findOne({ user: userId });
    console.log('getCart: cart =', cart);
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Remove product from cart (frontend sends productId)
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ success: false, message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update quantity of a product in cart (frontend sends productId and quantity)
exports.updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ success: false, message: 'Cart not found' });
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json({ success: true, cart });
    } else {
      res.json({ success: false, message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
