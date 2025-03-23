import axios from "./axios";

// ✅ Login Function
export const login = async (formData) => {
  const response = await axios.post("/api/auth/login", formData);
  
  // Save token to localStorage on successful login
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  
  return response.data;
};

// ✅ Register Function
export const register = async (formData) => {
  return axios.post("/api/auth/register", formData);
};

// ✅ Logout Function
export const logout = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
};

// ✅ Token Validation Function (Fixed the incorrect API route)
export const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { valid: false }; // No token means user is not authenticated
  }

  try {
    const response = await axios.get("/api/auth/validate", { // ✅ Fixed route
      headers: { Authorization: `Bearer ${token}` }, // Send token in headers
    });

    return response.data; // Returns { valid: true, user: {name, email, ...} }
  } catch (error) {
    return { valid: false }; // If token is invalid or expired
  }
};
