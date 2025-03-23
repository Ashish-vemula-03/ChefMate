import { useState } from "react";
import axios from "../services/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData);
  
      if (response.status === 201 || response.status === 200) {
        alert("✅ Registered successfully!");
        navigate("/login"); // Ensure it redirects to the login page
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed.");
      alert(`❌ ${error.response?.data?.message || "Registration failed."}`);
    }
  };
  

  return (
    <div className="register-page">
      {/* Background Images */}
      <img
        src="/images/chef-left.jpg"
        alt="Chef Left"
        className="bg-image left"
      />
      <img
        src="/images/chef-right.webp"
        alt="Chef Right"
        className="bg-image right"
      />

      {/* Form */}
      <motion.div
        className="form-container bg-white p-5 rounded shadow"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Join ChefMate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
