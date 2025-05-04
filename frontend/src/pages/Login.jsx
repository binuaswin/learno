import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../components/auth/Authcontext";// Updated import to match the new structure

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

  console.log("Login - Rendering with user:", user, "error:", error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLocalError("Please fill in both email and password.");
      return;
    }

    setLocalError("");
    setLoading(true);
    try {
      await login(email, password);
      console.log("Login attempt completed, user state:", user);
    } catch (err) {
      console.error("Login - Error during login:", err);
      setLocalError(error || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Login - User state updated, navigating to /profile:", user);
      navigate("/profile"); // Changed to /profile to match ProfilePage.jsx
    } else if (error) {
      console.log("Login - Error detected after login attempt:", error);
    }
  }, [user, error, navigate]);

  console.log("Login - Rendering login form");
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