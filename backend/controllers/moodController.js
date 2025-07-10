import Mood from "../models/mood.js";

// POST: Create today's mood entry
export const createMoodEntry = async (req, res) => {
  try {
    const { moods } = req.body;
    const date = new Date().setHours(0, 0, 0, 0);

    const existing = await Mood.findOne({ user: req.user._id, date });
    if (existing) {
      return res.status(400).json({ message: "Mood for today already exists." });
    }

    const mood = await Mood.create({
      user: req.user._id,
      moods,
      date,
    });

    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch all mood entries
export const getMoodEntries = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT: Update today's mood entry
export const updateTodayMood = async (req, res) => {
  try {
    const { moods } = req.body;
    const date = new Date().setHours(0, 0, 0, 0);

    const mood = await Mood.findOne({ user: req.user._id, date });
    if (!mood) {
      return res.status(404).json({ message: "Today's mood entry not found" });
    }

    mood.moods = moods || mood.moods;
    const updatedMood = await mood.save();

    res.json(updatedMood);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Mood Analytics (weekly + monthly)
export const getMoodAnalytics = async (req, res) => {
  try {
    const allMoods = await Mood.find({ user: req.user._id });

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const weekly = {};
    const monthly = {};

    for (const moodEntry of allMoods) {
      const date = new Date(moodEntry.date);

      moodEntry.moods.forEach((mood) => {
        if (date >= startOfWeek) {
          weekly[mood] = (weekly[mood] || 0) + 1;
        }
        if (date >= startOfMonth) {
          monthly[mood] = (monthly[mood] || 0) + 1;
        }
      });
    }

    res.json({ weekly, monthly });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
