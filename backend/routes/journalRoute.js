import express from "express";
import { createJournalEntry, getJournalEntries, deleteJournalEntry, updateJournalEntry } from "../controllers/journalController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/", protect, createJournalEntry);
router.get("/", protect, getJournalEntries);
router.delete("/:id", protect, deleteJournalEntry);
router.put("/:id", protect, updateJournalEntry);

export default router;

