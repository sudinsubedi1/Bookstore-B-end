import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  stock: { type: Number},
  sold: { type: Number },
});

export const Book = mongoose.model("Book", bookSchema, "book"); // 👈 Use named export