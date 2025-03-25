import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Get API base URL from .env
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
const AuthService = {
  // ✅ SIGNUP FUNCTION
  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return { error: error.response?.data?.message || "Signup failed" };
    }
  },

  // ✅ LOGIN FUNCTION
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password,
      });

      // Save token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      return { error: error.response?.data?.message || "Login failed" };
    }
  },

  // ✅ LOGOUT FUNCTION
  logout: () => {
    localStorage.removeItem("token"); // Remove token from local storage
  },

  // ✅ GET AUTH TOKEN (For Protected Routes)
  getAuthToken: () => {
    return localStorage.getItem("token");
  },

  // ✅ CHECK IF USER IS LOGGED IN
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  updateUserProfile: async (updatedUser) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}users/update`,
        updatedUser,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        error: error.response?.data?.message || "Profile update failed",
      };
    }
  },

  // FETCH CURRENT USER DATA
  getUserProfile: async () => {
    try {
      const token = AuthService.getAuthToken();
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BASE_URL}users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return {
        error: error.response?.data?.message || "Failed to fetch user profile",
      };
    }
  },
};

export default AuthService;
