import { useEffect, useState } from "react";
import axios from "axios";

const Journal = () => {
  const [prompt, setPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const prompts = [
    "What made you smile today?",
    "Write about a recent challenge and how you dealt with it.",
    "Describe something you're grateful for.",
    "How are you feeling right now?",
    "What`s one goal you have for this week?",
    "Write about a moment you felt proud recently.",
    "What`s something you learned recently?"
  ];

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/journals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching entries", err);
    }
  };

  const generatePrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/journals/${editingId}`,
          { content: entry, prompt },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/journals",
          { content: entry, prompt },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setEntry("");
      fetchEntries();
    } catch (err) {
      console.error("Error submitting entry", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setEntry(entry.content);
    setPrompt(entry.prompt || "");
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEntries();
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  useEffect(() => {
    fetchEntries();
    generatePrompt();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Journal</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-auraGray p-6 rounded-xl shadow">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg flex items-center">
              Prompt:
              <button
                type="button"
                onClick={generatePrompt}
                className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
              >
                Generate Prompt
              </button>
            </label>
          </div>
          <p className="italic text-gray-600 mt-2">{prompt}</p>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-4 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="5"
          placeholder="Write your journal entry..."
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          {editingId ? "Update Entry" : "Save Entry"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-3">Previous Entries</h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry._id} className="bg-gray-100 p-4 rounded-md shadow">
            {entry.prompt && (
              <p className="italic text-sm text-gray-600 mb-1">
                <strong>Prompt:</strong> {entry.prompt}
              </p>
            )}
            <p className="text-gray-800 mb-1">{entry.content}</p>
            <p className="text-xs text-gray-500">
              {entry.date
                ? new Date(entry.date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Date not available"}
            </p>
            <div className="mt-2 flex space-x-4 text-sm">
              <button
                onClick={() => handleEdit(entry)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
