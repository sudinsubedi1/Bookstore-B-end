import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";
import adminRoute from "./route/admin.route.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000; 
const URI = process.env.MongoDBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
