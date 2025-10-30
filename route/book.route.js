import express from "express";
import { getBook, getSingleBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);        // GET /book → all books
router.get("/:id", getSingleBook); // GET /book/:id → single book

export default router;
