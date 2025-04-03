import { useState } from "react";
import axios from "../services/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/register.css";
import { BiMobile } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "", // ✅ Added mobile field
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    // Clear any old tokens or data before registering
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("user");
  
    try {
      const response = await axios.post("/auth/register", formData);
  
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("✅ Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed.";
      setErrorMessage(`❌ ${message}`);
    } finally {
      setLoading(false);
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

        {/* Error Message */}
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

        {/* Success Message */}
        {successMessage && <p className="alert alert-success">{successMessage}</p>}

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

          {/* ✅ Added Mobile Number Field */}
          <div className="mb-3">
            <label>Mobile Number</label>
            <div className="input-group">
              <span className="input-group-text">
                <BiMobile size={20} />
              </span>
              <input
                type="tel"
                name="mobile"
                className="form-control"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none text-primary fw-bold">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
