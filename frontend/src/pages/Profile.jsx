import React, { useState, useEffect } from "react";
import axios from "../services/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token from localStorage
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Profile</h2>
      <div className="card p-3 shadow-sm">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;