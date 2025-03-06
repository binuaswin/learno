import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../components/authUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

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
      console.log("Login attempt completed, user state:", user); // Debug
      // Navigation handled by useEffect; avoid premature check here
    } catch {
      setLocalError(error || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate when user state is set
  useEffect(() => {
    if (user) {
      console.log("User state updated, navigating to dashboard:", user);
      navigate("/dashboard");
    } else if (error) {
      console.log("Error detected after login attempt:", error);
    }
  }, [user, error, navigate]); // Trigger on user or error change

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