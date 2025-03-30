import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    dob: "",
    phoneNumber: "",
    isForeigner: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await AuthService.signup(formData); // Send as JSON

      if (response.error) {
        setError(response.error);
      } else {
        alert("Registration Successful! Redirecting to login...");
        navigate("/login");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mt-4">
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mt-4">
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label htmlFor="repeatPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="mt-4">
            <label htmlFor="dob" className="block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="input input-bordered w-full"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="input input-bordered w-full"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Foreigner Checkbox */}
          <div className="mt-4">
            <label htmlFor="isForeigner" className="cursor-pointer label">
              <span className="label-text">Are you a Foreigner?</span>
              <input
                type="checkbox"
                id="isForeigner"
                name="isForeigner"
                className="checkbox checkbox-primary"
                checked={formData.isForeigner}
                onChange={handleChange}
              />
            </label>
          </div>

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
