import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./pages/dashboard";
import Journal from "./pages/journal";
import Login from "./pages/login";
import Register from "./pages/register";
import Mood from "./pages/mood";
import Breathe from "./pages/breathe";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Sync with localStorage when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
    navigate("/"); // Go to dashboard after login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login"); // Go to login after logout
  };

  return (
    <div className="flex flex-col min-h-screen bg-auraGray text-gray-800">
      <Navbar token={token} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/breathe" element={<Breathe />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
