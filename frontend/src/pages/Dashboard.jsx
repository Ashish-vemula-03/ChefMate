import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user is found in localStorage, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user.username} 👋
      </h1>

      <div className="space-y-4">
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-purple-600 text-white p-2 rounded"
          >
            View Favorites
          </button>
          <button
            onClick={() => navigate("/recommendations")}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Get Recommendations
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
