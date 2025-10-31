import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import Routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";
import adminRoute from "./route/admin.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection setup
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas");
        return true; // Return a success indicator
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        // It's good to exit here since the app can't run without the DB
        process.exit(1);
    }
};

// Start server logic
const startServer = async () => {
    // 🛑 STEP 1: WAIT FOR DATABASE CONNECTION TO COMPLETE
    await connectDB();

    // Health check route
    app.get("/", (req, res) => {
        res.send("Backend is running");
    });

    // API routes (only set up and active AFTER connection)
    app.use("/book", bookRoute); 
    app.use("/user", userRoute);
    app.use("/cart", cartRoute);
    app.use("/admin", adminRoute);

    // 🛑 STEP 2: START LISTENING FOR REQUESTS
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
};

// Execute the new combined startup function
startServer();