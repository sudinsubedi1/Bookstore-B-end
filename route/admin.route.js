import express from "express";
import Book from "../model/book.model.js";

const router = express.Router();

// Add a new book
router.post("/add-book", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: "Failed to save book", error: err.message });
  }
});

// Update an existing book
router.put("/update-book/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Failed to update book", error: err.message });
  }
});

// Delete a book
router.delete("/delete-book/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete book", error: err.message });
  }
});

export default router;
