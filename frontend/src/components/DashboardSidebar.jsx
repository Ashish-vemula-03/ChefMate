import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Home, User, Heart, ChefHat, Settings, LogOut, Brain,
  BookOpenCheck, ClipboardList, Utensils, Mic, Image,
  Calendar, ListTodo, ShieldCheck, Moon, Sun
} from "lucide-react";

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 80 }}
      className="h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md fixed top-0 left-0 z-40 transition-all duration-300 overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <motion.h1
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="text-xl font-bold whitespace-nowrap"
        >
          {isOpen ? "FlavourNest" : ""}
        </motion.h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="px-2 space-y-6 overflow-y-auto pb-6">
        <SidebarSection title="Main" isOpen={isOpen}>
          <SidebarLink to="/dashboard" label="Dashboard" icon={<Home />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/profile" label="My Profile" icon={<User />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/favorites" label="Favorites" icon={<Heart />} isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="Recipes" isOpen={isOpen}>
          <SidebarLink to="/dashboard/explore" label="Explore Recipes" icon={<Utensils />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/my-recipes" label="My Recipes" icon={<BookOpenCheck />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/create" label="Create Recipe" icon={<ChefHat />} isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="AI Features" isOpen={isOpen}>
          <SidebarLink to="/dashboard/pantychef" label="PantyChef" icon={<ClipboardList />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/macroschef" label="MacrosChef" icon={<Brain />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/ai-chef" label="AI Cooking Assistant" icon={<Settings />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/image-search" label="Image Recognition" icon={<Image />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/voice-search" label="Voice Search" icon={<Mic />} isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="Meal Planning" isOpen={isOpen}>
          <SidebarLink to="/dashboard/meal-planner" label="Meal Planner" icon={<Calendar />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/shopping-list" label="Shopping List" icon={<ListTodo />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/preferences" label="Diet Preferences" icon={<ShieldCheck />} isOpen={isOpen} />
        </SidebarSection>

        <SidebarSection title="Account" isOpen={isOpen}>
          <SidebarLink to="/dashboard/change-password" label="Change Password" icon={<Settings />} isOpen={isOpen} />
          <SidebarLink to="/dashboard/delete-account" label="Delete Account" icon={<Settings />} isOpen={isOpen} />
          <SidebarLink to="/logout" label="Logout" icon={<LogOut />} isOpen={isOpen} />
        </SidebarSection>

        <div className="px-2 mt-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {<Moon size={18} />}
            {isOpen && <span>Toggle Theme</span>}
          </button>
        </div>
      </nav>
    </motion.aside>
  );
};

const SidebarLink = ({ to, label, icon, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${
        isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
      }`
    }
  >
    {icon}
    {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{label}</motion.span>}
  </NavLink>
);

const SidebarSection = ({ title, children, isOpen }) => (
  <div className="space-y-2">
    {isOpen && (
      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xs text-gray-500 uppercase font-semibold px-2 tracking-wide"
      >
        {title}
      </motion.h3>
    )}
    <div className="space-y-1">{children}</div>
  </div>
);

export default DashboardSidebar;
