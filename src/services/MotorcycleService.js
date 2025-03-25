import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/";

// ✅ Get authentication headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("adminToken");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

const MotorcycleService = {
  // ✅ Fetch All Motorcycles with Pagination & Search
  getAllMotorcycles: async (page = 1, limit = 10, search = "") => {
    try {
      const response = await axios.get(
        `${BASE_URL}motorcycles?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      return { motorcycles: [], totalPages: 1 };
    }
  },

  // ✅ Fetch a Single Motorcycle by ID
  getMotorcycleById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}motorcycles/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching motorcycle:", error);
      return { error: "Failed to fetch motorcycle" };
    }
  },
};

export default MotorcycleService;
