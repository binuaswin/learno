import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Default Profile Picture URL
const DEFAULT_PROFILE_IMAGE = "/JPEGME.jpg"; // Ensure this image is in the public folder

// Create Context
const ProfileContext = createContext();

// Provider Component
export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);

  // Load profile picture from local storage when the app starts
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    console.log("Loaded image from localStorage:", savedImage);

    if (savedImage) {
      const img = new Image();
      img.src = savedImage;
      img.onload = () => setProfileImage(savedImage); // Use the saved image if valid
      img.onerror = () => setProfileImage(DEFAULT_PROFILE_IMAGE); // Reset on error
    } else {
      setProfileImage(DEFAULT_PROFILE_IMAGE);
    }
  }, []);

  // Update local storage whenever the profile picture changes
  const updateProfileImage = (image) => {
    setProfileImage(image);
    localStorage.setItem("profileImage", image); // Save to Local Storage
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Define PropTypes
ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to use Profile Context
// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);
