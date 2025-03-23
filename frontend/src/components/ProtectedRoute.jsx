import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken"); // ✅ Check if token exists

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
