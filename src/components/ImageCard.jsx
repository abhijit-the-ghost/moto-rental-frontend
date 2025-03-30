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

  console.log(startDate, endDate, "dates");
  // Effect to check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Effect to calculate the total amount based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setTotalAmount(days * price);
      } else {
        setTotalAmount(0);
      }
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
    }
  };

  // Open modal to rent motorcycle
  const handleOpenModal = () => {
    if (!isLoggedIn) {
      alert("Please log in to rent a motorcycle.");
      navigate("/login");
      return;
    }

    if (status === "Available") {
      setIsModalOpen(true);
    } else {
      alert("This motorcycle is not available for rent.");
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStartDate("");
    setEndDate("");
    setTotalAmount(0);
  };

  // Rent the motorcycle
  // In ImageCard.jsx
  const handleRent = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      alert("Invalid date selected.");
      return;
    }

    if (parsedEndDate <= parsedStartDate) {
      alert("End date must be after start date.");
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
        parsedStartDate,
        parsedEndDate
      );

      if (response?.success) {
        alert(
          "Please visit MotoRentals, Balaju, Kathmandu to take your rented motorcycle."
        );
        handleCloseModal();
        // Optionally, refresh the motorcycle list or user data here
      } else {
        alert(response.error || "Failed to rent motorcycle.");
      }
    } catch (error) {
      alert("An error occurred while processing your rental request.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card bg-base-100 w-80 shadow-sm">
        <figure>
          <img
            src={`http://localhost:5000${image}`}
            alt={name}
            className="bg-contain h-52 w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{company}</div>
          </h2>
          <p className="text-start">{description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">${price}/day</div>
            <div className="badge badge-outline">{status}</div>
          </div>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            Rent Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Rent {name}</h2>
            <label className="block mb-2">Start Date:</label>
            <input
              type="date"
              className="input input-bordered w-full mb-4"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block mb-2">End Date:</label>
            <input
              type="date"
              className="input input-bordered w-full mb-4"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <p className="mb-4">
              Total Amount: <span className="font-bold">${totalAmount}</span>
            </p>

            <div className="flex justify-end">
              <button
                className="btn btn-secondary mr-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleRent}
                disabled={loading || totalAmount <= 0}
              >
                {loading ? "Processing..." : "Confirm Rental"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
