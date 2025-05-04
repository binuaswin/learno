// frontend/src/pages/SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Assuming a CSS file
import { useAuth } from "../components/auth/Authcontext"; // Correct import

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { error } = useAuth(); // Remove unused 'user'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    setLocalError('');
    setLoading(true);
    try {
      // Here, you’d typically call a signup API via axios or context
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        navigate('/'); // Redirect to login after successful signup
      } else {
        setLocalError(data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err); // Log the error for debugging
      setLocalError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        {(localError || error) && <p className="error">{localError || error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="name" className="label">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter your name"
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="signup-footer">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;