// src/components/DashboardSidebar.jsx

import "../styles/DashboardSidebar.css";
import {
  Utensils,
  BookOpenCheck,
  ChefHat,
  Heart,
  ClipboardList,
  Brain,
  Image,
  Mic,
  Bot,
  Calendar,
  ListTodo,
  CookingPot,
  ShieldCheck,
  ShoppingCart,
  Medal,
  Bell,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const DashboardSidebar = ({ isOpen: parentSidebarState, setSidebarOpen, selectedMenu, setSelectedMenu }) => {
  const navItems = [
    { label: "Explore", icon: Utensils },
    { label: "My Recipes", icon: BookOpenCheck },
    { label: "Add Recipe", icon: ChefHat },
    { label: "Favorites", icon: Heart },
    { label: "What’s in My Kitchen", icon: ClipboardList },
    { label: "Healthy Plate", icon: Brain },
    { label: "Image Search", icon: Image },
    { label: "Voice Search", icon: Mic },
    { label: "AI Assistant", icon: Bot },
    { label: "Meal Planner", icon: Calendar },
    { label: "My Meal Plans", icon: ListTodo },
    { label: "Shopping List", icon: ShoppingCart },
    { label: "Cooking Mode", icon: CookingPot },
    { label: "Preferences", icon: ShieldCheck },
    { label: "Achievements", icon: Medal },
    { label: "Notifications", icon: Bell },
    { label: "Community", icon: Users },
  ];

  return (
    <aside className={clsx("dashboard-sidebar", parentSidebarState ? "sidebar-expanded" : "sidebar-collapsed", "dark")}>
      <div className="px-2 space-y-2 pb-6">
        {navItems.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={clsx("sidebar-item dark group relative", selectedMenu === label && "active")}
            onClick={() => setSelectedMenu(label)}
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <Icon size={20} />
              {parentSidebarState ? <span>{label}</span> : <span className="tooltip">{label}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      <div className="p-2 border-t border-gray-150 dark:border-gray-700">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={clsx(
            "flex items-center justify-center rounded transition hover:bg-gray-200 dark:hover:bg-gray-800",
            parentSidebarState ? "w-full p-2" : "w-10 h-10 mx-auto"
          )}
        >
          {parentSidebarState ? <ChevronLeft size={16} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
