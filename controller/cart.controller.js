import Cart from "../model/cart.model.js";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ bookId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.bookId");
    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Get Cart for a user
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Increase quantity of a book
export const increaseQuantity = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;
  console.log(userId,bookId)

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.bookId._id.toString() === bookId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;
    await cart.save();
    const updated = await cart.populate("items.bookId");
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to increase quantity" });
  }
};

// ✅ Decrease quantity of a book
export const decreaseQuantity = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.bookId._id.toString() === bookId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (i) => i.bookId._id.toString() !== bookId
      );
    }

    await cart.save();
    const updated = await cart.populate("items.bookId");
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to decrease quantity" });
  }
};

// ✅ Remove item completely
export const removeItem = async (req, res) => {
  const { userId } = req.query;
  const { bookId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.bookId._id.toString() !== bookId
    );

    await cart.save();
    const updated = await cart.populate("items.bookId");
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
