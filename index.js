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

// Middleware
app.use(cors()); // Allow all origins; restrict if needed
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; // Make sure Render has this env variable set

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

connectDB();

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
