import express from "express";
import { addToCart, getCart, increaseQuantity, decreaseQuantity, removeItem } from "../controller/cart.controller.js";

const router = express.Router();

// All cart routes require the user to be logged in
router.get("/:userId", getCart);
router.post("", addToCart);
router.put("/increase/:bookId",increaseQuantity);
router.put("/decrease/:bookId", decreaseQuantity);
router.delete("/remove/:bookId", removeItem);

// Optional: Admin-only cart management (if you ever want admin to manage carts)
// router.delete("/admin/remove/:bookId", authMiddleware, roleMiddleware(["admin"]), removeItem);

export default router;
