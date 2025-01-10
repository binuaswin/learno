import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required!");
      return;
    }

    alert("Account created successfully!");

    navigate("/");

    setErrorMessage("");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="Confirm your password"
            />
          </div>
          <button onSubmit="./"type="submit" className="signup-button">
          Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
