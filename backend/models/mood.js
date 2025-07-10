import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moods: {
    type: [String], // ← Allows multiple moods per entry
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // ← To be able to update only today (current date and not previous dates)
    unique: false,
  },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
