import express from "express";
import {
  createMoodEntry,
  getMoodEntries,
  updateTodayMood
} from "../controllers/moodController.js";
import { getMoodAnalytics } from "../controllers/moodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMoodEntry);             
router.get("/", protect, getMoodEntries);               
router.put("/today", protect, updateTodayMood);  
router.get("/analytics", protect, getMoodAnalytics);       

export default router;
