import React, { useState, useEffect } from "react";
import api from "../services/axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    localStorage.removeItem("authToken"); 
    localStorage.removeItem("user");
    
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      setCheckingToken(false); // No token, stay on login
      return;
    }
  
    api
      .get("/auth/validate", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.valid) {
          console.log("✅ Token valid. Redirecting to dashboard.");
          navigate("/dashboard");
        } else {
          console.log("❌ Invalid token. Please login again.");
          localStorage.removeItem("authToken"); // Ensure token removal
          setCheckingToken(false);
        }
      })
      .catch((error) => {
        console.error("❌ Token validation error:", error);
        localStorage.removeItem("authToken"); // Remove token on error
        setCheckingToken(false);
      });
  }, [navigate]);
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

 

    try {
      const response = await api.post("/auth/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        Checking authentication...
      </div>
    );
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/assets/login-bg.jpg')",
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-primary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
