import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./services/axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      api.get("/auth/validate", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data.valid) {
            setUser(res.data.user);
            console.log("✅ Token validated. User set:", res.data.user);
          } else {
            console.error("❌ Invalid token.");
            localStorage.removeItem("authToken");
          }
        })
        .catch((err) => {
          console.error("❌ Error during token validation:", err);
          localStorage.removeItem("authToken");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/favorites" element={<Favorites user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
