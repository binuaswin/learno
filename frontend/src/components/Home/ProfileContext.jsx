// frontend/src/components/Home/ProfileContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { DEFAULT_PROFILE_IMAGE } from './constants';

const ProfileContext = createContext();

export const ProfileProvider = ({ children, user }) => {
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (!user) {
          console.log('ProfileProvider - No user, using default image');
          setProfileImage(DEFAULT_PROFILE_IMAGE);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token') || document.cookie.match(/token=([^;]+)/)?.[1];
        if (!token) {
          console.log('ProfileProvider - No token, checking localStorage');
          const savedImage = localStorage.getItem('profileImage');
          if (savedImage) {
            setProfileImage(savedImage);
          } else {
            setProfileImage(DEFAULT_PROFILE_IMAGE);
          }
          setLoading(false);
          return;
        }

        console.log('ProfileProvider - Fetching profile with token');
        const response = await axios.get('http://localhost:5000/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log('ProfileProvider - Profile fetch response:', response.data);
        const backendImage = response.data.user.profileImage || localStorage.getItem('profileImage') || DEFAULT_PROFILE_IMAGE;
        setProfileImage(backendImage);
        localStorage.setItem('profileImage', backendImage);
      } catch (err) {
        console.error('ProfileProvider - Error fetching profile image:', err.response?.data || err.message);
        setError(err.response?.data?.message || err.message || 'Failed to load profile image');
        const savedImage = localStorage.getItem('profileImage') || DEFAULT_PROFILE_IMAGE;
        setProfileImage(savedImage);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileImage();
  }, [user]);

  const updateProfileImage = async (image) => {
    try {
      const token = localStorage.getItem('token') || document.cookie.match(/token=([^;]+)/)?.[1];
      if (!token) throw new Error('No token available');

      setProfileImage(image);
      localStorage.setItem('profileImage', image);

      console.log('ProfileProvider - Updating profile image with token');
      const response = await axios.put(
        'http://localhost:5000/api/profile/me',
        { profileImage: image },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      console.log('ProfileProvider - Profile update response:', response.data);
    } catch (err) {
      console.error('ProfileProvider - Error updating profile image:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || 'Failed to update profile image');
    }
  };

  console.log('ProfileProvider - Rendering with profileImage:', profileImage, 'loading:', loading, 'error:', error);
  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};

export default ProfileContext;