import express from "express";
import { getMotivationalQuote } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getMotivationalQuote);
export default router;
