import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      

      <div className="flex flex-col flex-1">
        {/* Pass toggleSidebar function to Navbar */}
        <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
       
      </div>
    </div>
  );
}
