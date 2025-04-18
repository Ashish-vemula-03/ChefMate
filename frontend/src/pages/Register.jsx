import React, { useState } from "react";
import api from "../services/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <motion.div
        className="register-form-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="register-title">Join ChefMate</h2>

        {error && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <div className="flex-shrink-0 me-2">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="register-label">
              Full Name
            </label>
            <div className="input-group register-input-group">
              <input
                type="text"
                className="form-control register-input"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="register-label">
              Email address
            </label>
            <div className="input-group register-input-group">
              <input
                type="email"
                className="form-control register-input"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <div className="input-group register-input-group">
              <input
                type="password"
                className="form-control register-input"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="register-label">
              Confirm Password
            </label>
            <div className="input-group register-input-group">
              <input
                type="password"
                className="form-control register-input"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn register-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 register-text">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
