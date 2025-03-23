import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fix: Check if the token is valid before redirecting
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      axios
        .get("/api/auth/validate", { headers: { Authorization: `Bearer ${token}` } })
        .then(() => navigate("/dashboard"))
        .catch(() => localStorage.removeItem("authToken")); // Remove invalid token
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", formData);
      const { token, user } = response.data; // Assuming API returns token & user info

      localStorage.setItem("authToken", token); // ✅ Store token
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Store user info

      navigate("/dashboard"); // ✅ Redirect to dashboard
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/src/assets/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login to ChefMate</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
