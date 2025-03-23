import { useState } from "react";
import Sidebar from "../components/Sidebar";
import QuickActions from "../components/QuickActions";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed on the Left, Full Height) */}
      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content (Pushes Sidebar) */}
      <div className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <h1 className="text-3xl font-bold mb-6">Welcome to Your AI-Powered Dashboard</h1>

        {/* Quick Actions & Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <QuickActions title="Find Recipes" description="Discover AI-powered recipes." color="bg-blue-500" />
          <QuickActions title="Track Macros" description="Analyze your daily nutrition." color="bg-green-500" />
          <QuickActions title="Meal Planner" description="Plan weekly meals." color="bg-yellow-500" />
        </div>

        {/* User Statistics Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <StatsCard title="Saved Recipes" value="25" />
          <StatsCard title="Recent Searches" value="12" />
          <StatsCard title="AI Recommendations" value="8" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
