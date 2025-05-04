// frontend/src/services/taskServices.js
import axios from 'axios';
// Removed unused import for 'toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

const taskServices = {
  fetchTasks: async () => {
    try {
      console.log('Fetching tasks...');
      const response = await axios.get(`${API_URL}/tasks`, getAuthHeaders());
      console.log('Fetch tasks response:', response.data);
      return response.data.tasks;
    } catch (error) {
      console.error('Fetch tasks error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  filterTasks: async (filters) => {
    try {
      console.log('Filtering tasks:', filters);
      const response = await axios.get(`${API_URL}/tasks/filter`, {
        ...getAuthHeaders(),
        params: filters,
      });
      console.log('Filter tasks response:', response.data);
      return response.data.tasks;
    } catch (error) {
      console.error('Filter tasks error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to filter tasks');
    }
  },

  addTask: async (taskData) => {
    try {
      console.log('Adding task:', taskData);
      const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
      console.log('Add task response:', response.data);
      return response.data.tasks[0];
    } catch (error) {
      console.error('Add task error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to add task');
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      console.log('Updating task:', taskId, taskData);
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeaders());
      console.log('Update task response:', response.data);
      return response.data.tasks[0];
    } catch (error) {
      console.error('Update task error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  deleteTask: async (taskId) => {
    try {
      console.log('Deleting task:', taskId);
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeaders());
      console.log('Delete task response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Delete task error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },

  setReminder: async (userId, reminderData) => {
    try {
      console.log('Setting reminder for user:', userId, reminderData);
      const response = await axios.post(`${API_URL}/reminders`, reminderData, getAuthHeaders());
      console.log('Set reminder response:', response.data);
      return response.data.reminder;
    } catch (error) {
      console.error('Set reminder error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to set reminder');
    }
  },

  getSettings: async (userId) => {
    try {
      console.log('Fetching settings for user:', userId);
      const response = await axios.get(`${API_URL}/users/${userId}/settings`, getAuthHeaders());
      console.log('Fetch settings response:', response.data);
      return response.data.settings;
    } catch (error) {
      console.error('Fetch settings error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch settings');
    }
  },

  updateSettings: async (userId, settingsData) => {
    try {
      console.log('Updating settings for user:', userId, settingsData);
      const response = await axios.put(`${API_URL}/users/${userId}/settings`, settingsData, getAuthHeaders());
      console.log('Update settings response:', response.data);
      return response.data.settings;
    } catch (error) {
      console.error('Update settings error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to update settings');
    }
  },

  addCategory: async (userId, category) => {
    try {
      console.log('Adding category for user:', userId, category);
      const response = await axios.post(`${API_URL}/users/${userId}/categories`, { category }, getAuthHeaders());
      console.log('Add category response:', response.data);
      return response.data.category;
    } catch (error) {
      console.error('Add category error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to add category');
    }
  },

  syncData: async (userId, syncData) => {
    try {
      console.log('Syncing data for user:', userId, syncData);
      const response = await axios.post(`${API_URL}/users/${userId}/sync`, syncData, getAuthHeaders());
      console.log('Sync data response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Sync data error:', error.response?.data || error.message);
      if (error.response?.data?.error === 'TokenExpired') {
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to sync data');
    }
  },
};

export default taskServices;