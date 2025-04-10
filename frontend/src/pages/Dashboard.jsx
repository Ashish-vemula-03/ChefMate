import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import "../styles/Dashboard.css"; // Import the new CSS

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Fixed Navbar */}
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar and Main Content Layout */}
      <div className="dashboard-layout">
        <DashboardSidebar
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="dashboard-main-content">
          <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
          {/* Add more content here */}
        </main>
      </div>
    </div>
  );
}
