import axios from "./axios";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get("/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFavorites = async () => {
  return axios.get("/api/favorites");
};

export const getRecommendations = async () => {
  return axios.get("/api/recommendations");
};

export const getMealPlans = async () => {
  return axios.get("/api/meal-plans");
};
