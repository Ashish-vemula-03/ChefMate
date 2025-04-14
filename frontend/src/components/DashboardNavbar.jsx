import { Search, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chefMateLogo from "../assets/login-bg.jpg";
import "../styles/DashboardNavbar.css";

export default function DashboardNavbar({ setSearchQuery }) {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search query state
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load Dark Mode Preference from Local Storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark-mode");
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Handle Navigation Clicks
  const handleProfileClick = () => navigate("/profile");
  const handleSettingsClick = () => navigate("/settings");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchQuery(e.target.value); // Pass search query to parent component
  };

  return (
    <nav className="dashboard-navbar">
      {/* Left Section: Logo & Brand Name */}
      <div className="navbar-left">
        <img src={chefMateLogo} alt="ChefMate Logo" className="logo" />
        <h1 className="brand-name">ChefMate</h1>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="navbar-search">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input
          placeholder="Search recipes, ingredients..."
          className="search-input"
        />
      </div>

      {/* Right Section: Dark Mode & Profile Dropdown */}
      <div className="navbar-right">
        <button onClick={toggleDarkMode} className="icon-button" aria-label="Toggle Dark Mode">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <div className="profile-container" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="Profile Menu"
          >
            👤
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleProfileClick}>👤 Profile</li>
                <li onClick={handleSettingsClick}>⚙️ Settings</li>
                <li className="logout" onClick={handleLogout}>🚪 Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
