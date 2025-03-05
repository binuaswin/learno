import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie"; // Install: npm install js-cookie
import { useAuth } from "../components/authUtils"; // Update import to authUtils.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // Local error for form validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, error } = useAuth(); // Use error from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLocalError("Please fill in both email and password.");
      return;
    }

    setLocalError(""); // Clear local error
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, {
        withCredentials: true, // Enable cookies for token storage
      });

      const { accessToken, refreshToken } = response.data;
      Cookies.set("token", accessToken, { expires: 1/24 }); // 1 hour expiry
      Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiry

      await login(accessToken, refreshToken);
      alert("Login successful!");
      navigate('/dashboard'); // Redirect to dashboard (or role-based route)
    } catch (err) {
      setLocalError(err.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        {(localError || error) && <p className="error">{localError || error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="login-footer">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;