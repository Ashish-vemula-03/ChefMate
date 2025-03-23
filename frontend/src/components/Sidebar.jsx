import { useState } from "react";
import { FiMenu, FiHome, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Sidebar Header (Toggle Button) */}
      <div className="p-4 flex items-center justify-between">
        <button
          className="text-white text-2xl"
          onClick={() => {
            setIsOpen(!isOpen);
            setSidebarOpen(!isOpen);
          }}
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-3 text-black">
              <FiHome className="text-xl" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="flex items-center space-x-3 text-black">
              <FiHeart className="text-xl" />
              {isOpen && <span>Favorites</span>}
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center space-x-3 text-black">
              <FiUser className="text-xl" />
              {isOpen && <span>Profile</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="flex items-center space-x-3 text-black">
          <FiLogOut className="text-xl" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
