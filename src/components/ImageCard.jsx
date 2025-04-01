import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import RentalService from "../services/RentalServices";

const ImageCard = ({
  uuid,
  name,
  description,
  image,
  price,
  company,
  status,
}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dateError, setDateError] = useState("");

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Calculate total amount and validate dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today to midnight

      // Reset errors and total amount
      setDateError("");
      setTotalAmount(0);

      // Validation checks
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setDateError("Please select valid dates.");
        return;
      }
      if (start < today) {
        setDateError("Start date cannot be in the past.");
        return;
      }
      if (end <= start) {
        setDateError("End date must be after start date.");
        return;
      }

      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalAmount(days * price);
    }
  }, [startDate, endDate, price]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const user = await AuthService.getUserProfile();
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
      localStorage.removeItem("token"); // Clear invalid token
    }
  };

  // Open modal with pre-checks
  const handleOpenModal = () => {
    if (!isLoggedIn) {
      alert("Please log in to rent a motorcycle.");
      navigate("/login");
      return;
    }
    if (!userData?.verified) {
      alert("Your account must be verified to rent a motorcycle.");
      navigate("/profile"); // Redirect to profile for verification
      return;
    }
    if (status !== "Available") {
      alert("This motorcycle is currently unavailable.");
      return;
    }
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStartDate("");
    setEndDate("");
    setTotalAmount(0);
    setDateError("");
  };

  // Handle rental submission
  const handleRent = async () => {
    if (!startDate || !endDate) {
      setDateError("Please select both start and end dates.");
      return;
    }

    if (dateError) {
      alert(dateError);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || !userData?._id) {
        alert("User not authenticated. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await RentalService.rentMotorcycle(
        uuid,
        new Date(startDate),
        new Date(endDate)
      );

      if (response?.success) {
        alert(
          "Rental confirmed! Please visit MotoRentals, Balaju, Kathmandu to pick up your motorcycle."
        );
        handleCloseModal();
        // Optionally trigger a parent refresh if provided
      } else {
        alert(response.error || "Failed to process rental request.");
      }
    } catch (error) {
      alert(
        "An error occurred while processing your rental. Please try again."
      );
      console.error("Rental error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
      <figure>
        <img
          src={
            image.startsWith("http") ? image : `http://localhost:5000${image}`
          }
          alt={name}
          className="h-52 w-full object-fill"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-bold text-gray-800">
          {name}
          <div className="badge badge-secondary ml-2">{company}</div>
        </h2>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-2">
            <div className="badge badge-outline badge-lg">${price}/day</div>
            <div
              className={`badge badge-lg ${
                status === "Available" ? "badge-success" : "badge-error"
              }`}
            >
              {status}
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleOpenModal}
            disabled={loading}
          >
            Rent Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rent {name}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  disabled={loading}
                  required
                />
              </div>
              {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
              <p className="text-gray-700">
                Total Amount:{" "}
                <span className="font-bold text-green-600">
                  ${totalAmount.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="btn btn-outline btn-error flex-1"
                onClick={handleCloseModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-success flex-1"
                onClick={handleRent}
                disabled={loading || totalAmount <= 0 || dateError}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Rental"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
