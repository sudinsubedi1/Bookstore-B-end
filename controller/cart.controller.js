import { Cart } from "../model/cart.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ bookId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.bookId");
    console.log("🛒 Cart updated:", populatedCart);
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("❌ Failed to add to cart:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get cart for a user
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    console.log("🛒 Cart fetched:", cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error("❌ Failed to get cart:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Increase quantity
export const increaseQuantity = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.bookId._id.toString() === bookId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;
    await cart.save();
    const updated = await cart.populate("items.bookId");
    console.log("🛒 Increased quantity:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to increase quantity:", error);
    res.status(500).json({ message: "Failed to increase quantity" });
  }
};

// Decrease quantity
export const decreaseQuantity = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.bookId._id.toString() === bookId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(i => i.bookId._id.toString() !== bookId);
    }

    await cart.save();
    const updated = await cart.populate("items.bookId");
    console.log("🛒 Decreased quantity:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to decrease quantity:", error);
    res.status(500).json({ message: "Failed to decrease quantity" });
  }
};

// Remove item
export const removeItem = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.bookId._id.toString() !== bookId);
    await cart.save();
    const updated = await cart.populate("items.bookId");
    console.log("🛒 Item removed:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to remove item:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
