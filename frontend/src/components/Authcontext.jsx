import { useState, useEffect, useCallback } from "react"; // Remove createContext
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext as AuthContextObj } from "./authUtils"; // Import from utility file

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  // Define logout first to avoid initialization issues
  const logout = useCallback(() => {
    console.log('Logging out'); // Debug
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setUser(null);
    setError(null); // Clear errors on logout
    navigate("/");
  }, [navigate]); // Add navigate as a dependency for logout

  const login = async (accessToken, refreshToken) => {
    setLoading(true); // Set loading before API call
    Cookies.set("token", accessToken, { expires: 1/24 }); // 1 hour expiry
    Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiry
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true, // Enable cookies
      });
      setUser(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.log('Login error:', error.response?.data); // Debug
      if (error.response?.data?.error === "TokenExpired") {
        await refreshToken();
      } else {
        setError(error.response?.data?.message || "Login failed");
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    setLoading(true); // Set loading before refresh
    const refreshToken = Cookies.get("refreshToken");
    console.log('Refreshing token with:', { refreshToken }); // Debug
    if (!refreshToken) {
      console.log('No refresh token, logging out'); // Debug
      logout();
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/refresh-token", { refreshToken }, {
        withCredentials: true,
      });
      const newAccessToken = response.data.accessToken;
      Cookies.set("token", newAccessToken, { expires: 1/24 });
      const profileResponse = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${newAccessToken}` },
        withCredentials: true,
      });
      setUser(profileResponse.data);
      setError(null); // Clear errors on success
    } catch (error) {
      console.log('Refresh token error:', error.response?.data); // Debug
      setError(error.response?.data?.message || "Failed to refresh token");
      logout(); // Only log out if refresh fails
    } finally {
      setLoading(false);
    }
  }, [logout]); // Add logout as a dependency for refreshToken

  const hasRole = (requiredRole) => user?.role === requiredRole;

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true); // Set loading before checking auth
      const token = Cookies.get("token");
      console.log('Checking auth with token:', token); // Debug
      if (!token) {
        console.log('No token, setting loading to false'); // Debug
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log('Token validation error:', error.response?.data); // Debug
        if (error.response?.data?.error === "TokenExpired") {
          await refreshToken();
        } else {
          setError(error.response?.data?.message || "Authentication failed");
          logout(); // Only log out if refresh fails or token is invalid
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [logout, refreshToken]); // Add dependencies

  return (
    <AuthContextObj.Provider value={{ user, loading, login, logout, hasRole, refreshToken, error }}>
      {children}
    </AuthContextObj.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default AuthProvider; // Export only the component