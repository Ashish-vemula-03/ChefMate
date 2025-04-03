import axios from "./axios";

// ✅ Login Function
export const login = async (formData) => {
  try {
    const response = await axios.post("/api/auth/login", formData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user data
    }

    console.log("✅ User logged in:", response.data.user);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error;
  }
};



// ✅ Register Function
export const register = async (formData) => {
  try {
    const response = await axios.post("/api/auth/register", formData);
    
    console.log("✅ User registered successfully:", response.data);

    // Auto-login after registration (Optional)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("✅ Token stored after registration:", localStorage.getItem("token"));
    }

    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    throw error; // Ensure errors are handled in the frontend
  }
};

// ✅ Logout Function
export const logout = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
};

// ✅ Token Validation Function (Fixed the incorrect API route)
export const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("❌ No token found in localStorage");
    return { valid: false };
  }

  try {
    const response = await axios.get("/api/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Store user data
    localStorage.setItem("user", JSON.stringify(response.data.user));

    console.log("✅ Token is valid:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Token validation failed:", error.response?.data || error.message);
    return { valid: false };
  }
};

