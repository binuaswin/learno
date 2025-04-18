// frontend/components/authUtils.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const logout = (setLoading, setError, callback) => {
  Cookies.remove('token');
  Cookies.remove('refreshToken');
  setLoading(false);
  setError(null);
  if (callback) callback();
};

export const login = async (email, password, setLoading, setError) => {
  setLoading(true);
  console.log('Login attempt - Email:', email, 'Password:', password);
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
    console.log('Login response:', response.data);
    const { accessToken, refreshToken } = response.data;
    Cookies.set('token', accessToken, { expires: 1 / 24 });
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
    const profileResponse = await axios.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log('Profile response:', profileResponse.data);
    return { success: true, user: profileResponse.data };
  } catch (error) {
    console.error('Detailed login error:', error.response?.data, 'Status:', error.response?.status, 'Message:', error.message);
    const errorMessage = error.response?.data?.message || 'Login failed: ' + error.message;
    setError(errorMessage);
    logout(setLoading, setError);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};