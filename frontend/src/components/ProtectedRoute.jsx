import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  const token = localStorage.getItem("authToken");

  // If no token, redirect to login
  if (!token) {
    console.log("❌ No token found. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  // If user is not set but token exists, validate the token
  if (!user) {
    console.log("❌ User not authenticated. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  console.log("✅ Access granted to protected route.");
  return <Outlet />;
};

export default ProtectedRoute;
