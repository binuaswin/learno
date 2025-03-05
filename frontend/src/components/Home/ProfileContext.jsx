// frontend/src/ProfileContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DEFAULT_PROFILE_IMAGE } from "./constants";

// Create Context
const ProfileContext = createContext();

// Provider Component
export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile image from backend on mount
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const savedImage = localStorage.getItem("profileImage");
          if (savedImage) {
            setProfileImage(savedImage);
          }
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/profile", { // Updated endpoint
          headers: { Authorization: `Bearer ${token}` },
        });
        const backendImage = response.data.profileImage || localStorage.getItem("profileImage") || DEFAULT_PROFILE_IMAGE;
        setProfileImage(backendImage);
        localStorage.setItem("profileImage", backendImage); // Sync localStorage
      } catch (err) {
        console.error("Error fetching profile image:", err);
        setError("Failed to load profile image");
        const savedImage = localStorage.getItem("profileImage") || DEFAULT_PROFILE_IMAGE;
        setProfileImage(savedImage);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileImage();
  }, []);

  // Update profile image and sync with backend
  const updateProfileImage = async (image) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available");

      setProfileImage(image);
      localStorage.setItem("profileImage", image);

      await axios.put(
        "http://localhost:5000/api/auth/profile", // Updated endpoint
        { profileImage: image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error updating profile image:", err);
      setError("Failed to update profile image");
    }
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Define PropTypes
ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export Context for useProfile hook
export default ProfileContext;