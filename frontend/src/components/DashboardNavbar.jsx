import { Search, Sun, Moon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import chefMateLogo from "../assets/img/logo/logo2.png";
import "../styles/DashboardNavbar.css";

export default function DashboardNavbar({ setSearchQuery }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <img src={chefMateLogo} alt="ChefMate Logo" className="logo" />
        <p className="fw-bold fs-4 home-logo text-uppercase mb-0 brand-text">
          Chef<span className="accent-text">Mate</span>
        </p>
      </div>

      <div className="navbar-search">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search recipes, ingredients..."
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        <button
          onClick={toggleDarkMode}
          className="icon-button"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="profile-button"
          aria-label="Go to Profile"
        >
          <User size={24} />
        </button>
      </div>
    </nav>
  );
}
