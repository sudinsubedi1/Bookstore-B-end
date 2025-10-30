import express from "express";

import { getBook,getSingleBook } from "../controller/book.controller.js";

const router = express.Router();
router.get("/book", getBook);        // fetch all books
router.get("/book/:id", getSingleBook); // fetch single book by id




export default router;