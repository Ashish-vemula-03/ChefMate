import "../styles/DashboardSidebar.css";
import {
  Utensils,
  BookOpenCheck,
  ChefHat,
  ClipboardList,
  Brain,
  Image,
  Mic,
  Calendar,
  ListTodo,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const DashboardSidebar = ({ isOpen: parentSidebarState, setSidebarOpen }) => {
  const navItems = [
    { label: "Explore", icon: Utensils, path: "/dashboard" }, // ✅ Add path
    { label: "My Recipes", icon: BookOpenCheck },
    { label: "Add Recipe", icon: ChefHat },
    { label: "PantyChef", icon: ClipboardList },
    { label: "MacrosChef", icon: Brain },
    { label: "Image Search", icon: Image },
    { label: "Voice Search", icon: Mic },
    { label: "Meal Planner", icon: Calendar },
    { label: "Shopping List", icon: ListTodo },
    { label: "Preferences", icon: ShieldCheck },
  ];

  return (
    <aside
      className={clsx(
        "dashboard-sidebar",
        parentSidebarState ? "sidebar-expanded" : "sidebar-collapsed",
        "dark"
      )}
    >
      {/* Sidebar Items */}
      <div className="px-2 space-y-2 pb-6">
        {navItems.map(({ label, icon: Icon }) => (
          <div key={label} className="sidebar-item dark group relative">
            <div className="flex items-center gap-3">
              <Icon size={20} />
              {parentSidebarState ? (
                <span>{label}</span>
              ) : (
                <span className="tooltip">{label}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Toggle Button */}
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
