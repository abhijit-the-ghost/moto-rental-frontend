import { useState } from "react";
import AuthService from "../services/AuthService"; // Import AuthService
import { useNavigate } from "react-router-dom"; // For redirection

const Register = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    dob: "",
    isForeigner: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Convert checkbox to boolean
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Send data as JSON since there are no files
    const response = await AuthService.signup(formData);

    if (response.error) {
      setError(response.error);
    } else {
      alert("Registration Successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mt-4"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password & Confirm Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full mt-4"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full mt-4"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />

          {/* Date of Birth */}
          <input
            type="date"
            name="dob"
            className="input input-bordered w-full mt-4"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Foreigner Checkbox */}
          <label className="cursor-pointer label mt-4">
            <span className="label-text">Are you a Foreigner?</span>
            <input
              type="checkbox"
              name="isForeigner"
              className="checkbox checkbox-primary"
              checked={formData.isForeigner}
              onChange={handleChange}
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="text-center mt-4">
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
