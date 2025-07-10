import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // This will clear token and redirect via App.jsx
    navigate("/login");
  };

  return (
    <nav className="bg-auraBlue text-[#1e293b] shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-2">
        <Link to="/" className="text-2xl font-semibold text-brandBlue">
          MindSync
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-4 text-sm font-medium">
          {token ? (
            <>
              <Link to="/journal" className="hover:text-[#0ea5e9]">Journal</Link>
              <Link to="/mood" className="hover:text-[#0ea5e9]">Mood Tracker</Link>
              <Link to="/breathe" className="hover:text-[#0ea5e9]">Breathe</Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#0ea5e9]">Login</Link>
              <Link to="/register" className="hover:text-[#0ea5e9]">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
