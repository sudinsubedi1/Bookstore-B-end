import express from "express";
import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../controller/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);                     // POST /cart → add item
router.get("/:userId", getCart);                // GET /cart/:userId → get cart
router.put("/increase/:bookId", increaseQuantity); // PUT /cart/increase/:bookId
router.put("/decrease/:bookId", decreaseQuantity); // PUT /cart/decrease/:bookId
router.delete("/remove/:bookId", removeItem);     // DELETE /cart/remove/:bookId

export default router; // ✅ Default export like Books routes
