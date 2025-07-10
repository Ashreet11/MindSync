import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const moods = ["Happy", "Sad", "Angry", "Excited", "Calm", "Stressed", "Anxious", "Tired", "Grateful", "Lonely"];

const Mood = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [analytics, setAnalytics] = useState({ weekly: {}, monthly: {} });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const saveMood = async () => {
    try {
      await axios.post("http://localhost:5000/api/moods", { moods: selectedMoods }, { headers });
      alert("Mood saved!");
      fetchAnalytics();
    } catch {
      try {
        await axios.put("http://localhost:5000/api/moods/today", { moods: selectedMoods }, { headers });
        alert("Mood updated!");
        fetchAnalytics();
      } catch (err) {
        alert("Error saving mood");
        console.error(err);
      }
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/moods/analytics", { headers });
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const weeklyChart = {
    labels: Object.keys(analytics.weekly),
    datasets: [{ label: "Weekly", data: Object.values(analytics.weekly), backgroundColor: "#60a5fa" }],
  };

  const monthlyChart = {
    labels: Object.keys(analytics.monthly),
    datasets: [{ label: "Monthly", data: Object.values(analytics.monthly), backgroundColor: "#34d399" }],
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mood Tracker</h1>

      <div className="mb-4">
        <label className="font-medium mb-1 block">Select Moods:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => toggleMood(mood)}
              className={`px-3 py-2 rounded border ${
                selectedMoods.includes(mood) ? "bg-blue-400 text-white" : "bg-white text-gray-700"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={saveMood}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Mood
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Weekly Chart</h2>
          <Bar data={weeklyChart} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Monthly Chart</h2>
          <Bar data={monthlyChart} />
        </div>
      </div>
    </div>
  );
};

export default Mood;
