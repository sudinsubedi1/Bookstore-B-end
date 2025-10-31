import {Book} from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();

    // 🧩 Debug log to check what’s coming from MongoDB
    console.log("📚 Books fetched from database:", books);

    // If no books found, send a clear message
    if (!books || books.length === 0) {
      return res.status(200).json({ message: "No books found in database", book: [] });
    }

    res.status(200).json(books);
  } catch (error) {
    console.log("❌ Error fetching books:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    console.log("📖 Single book fetched:", book);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error fetching single book:", error);
    res.status(500).json({ message: "Server error" });
  }
};
