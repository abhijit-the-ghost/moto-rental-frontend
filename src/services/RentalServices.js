import axios from "axios";

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/";

// Get Authorization headers with the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Format the date to "YYYY-MM-DD"
const formatDate = (date) => {
  // If the input date is already a Date object, no need to convert
  const d = new Date(date);

  // Check if the date is invalid (NaN)
  if (isNaN(d)) {
    throw new Error("Invalid date");
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's zero-indexed
  const day = String(d.getDate()).padStart(2, "0"); // Pad the day to ensure two digits

  return `${year}-${month}-${day}`;
};

const RentalService = {
  // ✅ Rent a Motorcycle
  // In RentalService.js
  rentMotorcycle: async (motorcycleId, rentStartDate, rentEndDate) => {
    try {
      const rentStartDateFormatted = formatDate(rentStartDate); // YYYY-MM-DD
      const rentEndDateFormatted = formatDate(rentEndDate); // YYYY-MM-DD

      const response = await axios.post(
        `${BASE_URL}rentals/rent/${motorcycleId}`,
        {
          rentStartDate: rentStartDateFormatted,
          rentEndDate: rentEndDateFormatted,
        },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error renting motorcycle:", error);
      return { error: "Failed to rent motorcycle" };
    }
  },

  // ✅ Return a Rented Motorcycle
  returnMotorcycle: async (rentalId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}rentals/return/${rentalId}`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error returning motorcycle:",
        error.response?.data || error
      );
      return {
        error: error.response?.data?.message || "Failed to return motorcycle",
      };
    }
  },

  // ✅ Get User's Rental History
  getUserRentals: async () => {
    try {
      const response = await axios.get(`${BASE_URL}rentals/user`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching rental history:", error);
      return { rentals: [] };
    }
  },
};

export default RentalService;
