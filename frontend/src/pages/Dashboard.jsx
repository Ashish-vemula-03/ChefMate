import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/Dashboard.css"; // Import the new CSS
import MainContent from "../components/MainContent";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Redirect if no user is logged in
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Fixed Navbar */}
      <DashboardNavbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        searchQuery={searchQuery} // Passing searchQuery to Navbar
        setSearchQuery={setSearchQuery} // Passing setSearchQuery to Navbar
      />

      {/* Sidebar and Main Content Layout */}
      <div className="dashboard-layout">
        <DashboardSidebar
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="dashboard-main-content">
          {/* Pass searchQuery to MainContent */}
          <MainContent searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
