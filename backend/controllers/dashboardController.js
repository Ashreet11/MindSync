import fetch from "node-fetch";

// Fallback quotes (hardcoded)
const fallbackQuotes = [
  "Take a deep breath. You're doing great.",
  "Progress, not perfection.",
  "This too shall pass.",
  "Your feelings are valid.",
  "Keep moving forward, even if it's slow."
];

export const getMotivationalQuote = async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    if (!Array.isArray(data) || !data[0]?.q) {
      throw new Error("Invalid response");
    }

    res.json({ quote: data[0].q, author: data[0].a });
  } catch (err) {
    // On failure, return a fallback quote
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json({ quote: random, author: "Unknown" });
  }
};
