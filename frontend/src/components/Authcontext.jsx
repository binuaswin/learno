import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext as AuthContextObj } from "./authUtils";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    console.log("Logging out, tokens before:", Cookies.get("token"), Cookies.get("refreshToken"));
    Cookies.remove("token", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    console.log("Tokens after removal:", Cookies.get("token"), Cookies.get("refreshToken"));
    setUser(null);
    setError(null);
    console.log("User and error states cleared, navigating to /");
    navigate("/");
  }, [navigate]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log("Attempting login with:", { email, password });
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password }, {
        withCredentials: true,
      });
      const { accessToken, refreshToken } = response.data;
      console.log("Login response received, tokens:", { accessToken, refreshToken });
      if (!accessToken || typeof accessToken !== "string" || !accessToken.includes(".")) {
        throw new Error("Invalid access token received");
      }
      Cookies.set("token", accessToken, { expires: 1 / 24 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      const profileResponse = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      console.log("Profile response received:", profileResponse.data);
      setUser(profileResponse.data);
      setError(null);
      navigate("/dashboard");
      console.log("Navigating to dashboard, user set:", profileResponse.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed: " + error.message;
      console.error("Detailed login error:", error.response?.data || error);
      setError(errorMessage);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    setLoading(true);
    const refreshToken = Cookies.get("refreshToken");
    console.log("Refreshing token with:", { refreshToken });
    if (!refreshToken) {
      console.log("No refresh token, logging out");
      logout();
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/refresh-token", { refreshToken }, {
        withCredentials: true,
      });
      const newAccessToken = response.data.accessToken;
      console.log("Storing new accessToken:", newAccessToken);
      if (!newAccessToken || typeof newAccessToken !== "string" || !newAccessToken.includes(".")) {
        throw new Error("Invalid new access token received");
      }
      Cookies.set("token", newAccessToken, { expires: 1 / 24 });
      const profileResponse = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${newAccessToken}` },
        withCredentials: true,
      });
      setUser(profileResponse.data);
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to refresh token: " + error.message;
      console.error("Detailed refresh token error:", error.response?.data || error);
      setError(errorMessage);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const hasRole = (requiredRole) => user?.role === requiredRole;

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      console.log("Checking auth with token:", token);
      if (!token) {
        console.log("No token, setting loading to false");
        setLoading(false);
        return;
      }

      if (typeof token !== "string" || !token.includes(".")) {
        console.log("Invalid token format, logging out");
        setError("Invalid token format");
        logout();
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Authentication failed: " + error.message;
        console.error("Detailed token validation error:", error.response?.data || error);
        if (error.response?.data?.error === "TokenExpired") {
          await refreshToken();
        } else {
          setError(errorMessage);
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [logout, refreshToken]);

  return (
    <AuthContextObj.Provider value={{ user, loading, login, logout, hasRole, refreshToken, error }}>
      {children}
    </AuthContextObj.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;