import { useState } from "react";
import AuthService from "../services/AuthService"; // Import AuthService
import { useNavigate } from "react-router-dom"; // Redirect after login

const Login = () => {
  const navigate = useNavigate();

  // State for email, password, loading & error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await AuthService.login(email, password);

    if (response.error) {
      setError(response.error);
    } else {
      alert("Login Successful!");
      navigate("/dashboard"); // Redirect user to dashboard after login
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-6" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider & Signup Link */}
        <div className="text-center mt-4">
          <span className="text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
