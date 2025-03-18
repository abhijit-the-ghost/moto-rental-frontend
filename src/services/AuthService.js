import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Get API base URL from .env

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

  // ✅ FETCH CURRENT USER DATA (Example Protected Route)
  getUserProfile: async () => {
    try {
      const token = AuthService.getAuthToken();
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BASE_URL}auth/profile`, {
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
