import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // ⚠️ Replace this later with real authentication logic (Context or Redux)
  const isAuthenticated = false; // Toggle this for testing
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🗑️ Clear tokens or auth states here (if using JWT, localStorage, etc.)
    console.log("Logged out!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ChefMate 🍽️
        </Link>

        <div className="flex gap-4">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/recipes" className="hover:text-yellow-400">
            Recipes
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/favorites" className="hover:text-yellow-400">
                Favorites
              </Link>
              <Link to="/recommendations" className="hover:text-yellow-400">
                Recommendations
              </Link>
              <Link to="/dashboard" className="hover:text-yellow-400">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 font-semibold"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-yellow-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-yellow-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
