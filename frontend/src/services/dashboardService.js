import axios from "./axios";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFavorites = async () => {
  return axios.get("/favorites");
};

export const addToFavorites = async (recipeId) => {
  return axios.post(`/favorites/${recipeId}`);
};

export const removeFromFavorites = async (recipeId) => {
  return axios.delete(`/favorites/${recipeId}`);
};

export const getRecommendations = async () => {
  return axios.get("/recommendations");
};

export const getMealPlans = async () => {
  return axios.get("/meal-plans");
};
