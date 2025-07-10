import { useEffect, useState } from "react";

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setQuote(data.quote || "Keep going, you're doing great.");
      } catch {
        setQuote("Keep going, you're doing great.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-auraGray min-h-[calc(100vh-140px)]">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MindSync 🌿</h1>
      <p className="text-lg text-gray-600 mb-8">Your safe space for mental clarity and wellness.</p>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Today's Motivation 💫</h2>
        {loading ? (
          <p className="text-gray-500 italic">Fetching inspiration...</p>
        ) : (
          <p className="text-gray-700">{quote}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
