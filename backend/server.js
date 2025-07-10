import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoute.js";
import moodRoutes from "./routes/moodRoute.js"; 
import dashboardRoutes from "./routes/dashboardRoute.js";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); //Middleware
app.use(cors());   

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

