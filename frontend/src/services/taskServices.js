// frontend/src/services/taskServices.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found. Please log in.');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const handleRequest = async (request) => {
  try {
    const response = await request();
    console.log('API response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error.response?.data?.message || 'Request failed';
  }
};

const taskServices = {
  fetchTasks: async () => {
    const data = await handleRequest(() => axios.get(`${API_URL}/tasks`, getAuthHeaders()));
    return Array.isArray(data.tasks) ? data.tasks : [];
  },

  filterTasks: async (filters) => {
    const data = await handleRequest(() =>
      axios.get(`${API_URL}/tasks/filter`, {
        ...getAuthHeaders(),
        params: filters,
      })
    );
    return Array.isArray(data.tasks) ? data.tasks : [];
  },

  addTask: async (taskData) => {
    const data = await handleRequest(() => axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders()));
    return Array.isArray(data.tasks) ? data.tasks[0] : data.tasks;
  },

  updateTask: async (taskId, taskData) => {
    const data = await handleRequest(() => axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeaders()));
    return Array.isArray(data.tasks) ? data.tasks[0] : data.tasks;
  },

  deleteTask: async (taskId) => {
    return handleRequest(() => axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeaders()));
  },

  setReminder: async (reminderData) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/tasks/reminder`, reminderData, getAuthHeaders())
    );
  },

  getSettings: async (userId) => {
    const data = await handleRequest(() =>
      axios.get(`${API_URL}/users/${userId}/settings`, getAuthHeaders())
    );
    return data;
  },

  updateSettings: async (userId, settingsData) => {
    const data = await handleRequest(() =>
      axios.put(`${API_URL}/users/${userId}/settings`, settingsData, getAuthHeaders())
    );
    return data;
  },

  addCategory: async (userId, category) => {
    const data = await handleRequest(() =>
      axios.post(`${API_URL}/users/${userId}/categories`, { category }, getAuthHeaders())
    );
    return data;
  },

  syncData: async (userId, syncData) => {
    const data = await handleRequest(() =>
      axios.post(`${API_URL}/users/${userId}/sync`, syncData, getAuthHeaders())
    );
    return data;
  },

  getAnalytics: async (period) => {
    return handleRequest(() =>
      axios.get(`${API_URL}/analytics`, {
        ...getAuthHeaders(),
        params: { period },
      })
    );
  },

  getRecentActivities: async () => {
    const data = await handleRequest(() => axios.get(`${API_URL}/activities`, getAuthHeaders()));
    return Array.isArray(data) ? data : [];
  },

  getAdaptiveLearningData: async () => {
    return handleRequest(() => axios.get(`${API_URL}/adaptiveLearning`, getAuthHeaders()));
  },

  updateAdaptiveLearningData: async (data) => {
    return handleRequest(() =>
      axios.put(`${API_URL}/adaptiveLearning`, data, getAuthHeaders())
    );
  },

  updateLearningGoal: async (learningGoal) => {
    return handleRequest(() =>
      axios.put(
        `${API_URL}/adaptiveLearning/learningGoal`,
        { learningGoal },
        getAuthHeaders()
      )
    );
  },

  startModule: async (moduleTitle) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/startModule`, { moduleTitle }, getAuthHeaders())
    );
  },

  updateRecommendation: async (moduleTitle, action, difficulty) => {
    return handleRequest(() =>
      axios.post(
        `${API_URL}/adaptiveLearning/recommendation`,
        { moduleTitle, action, difficulty },
        getAuthHeaders()
      )
    );
  },

  updateTimeSpent: async (task, hours) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/timeSpent`, { task, hours }, getAuthHeaders())
    );
  },

  submitQuiz: async (title, score) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/quiz`, { title, score }, getAuthHeaders())
    );
  },

  submitExercise: async (title, result) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/exercise`, { title, result }, getAuthHeaders())
    );
  },

  addGoal: async (skill, target) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/goal`, { skill, target }, getAuthHeaders())
    );
  },

  incrementStreak: async () => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/streak`, {}, getAuthHeaders())
    );
  },

  updateLearningMode: async (learningMode) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/learningMode`, learningMode, getAuthHeaders())
    );
  },

  updateMilestone: async (title, achieved) => {
    return handleRequest(() =>
      axios.post(
        `${API_URL}/adaptiveLearning/milestone`,
        { title, achieved },
        getAuthHeaders()
      )
    );
  },

  addReflection: async (module, note) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/reflection`, { module, note }, getAuthHeaders())
    );
  },

  addFeedback: async (module, comment, rating) => {
    return handleRequest(() =>
      axios.post(
        `${API_URL}/adaptiveLearning/feedback`,
        { module, comment, rating },
        getAuthHeaders()
      )
    );
  },

  addReminder: async (task, dueDate, time) => {
    return handleRequest(() =>
      axios.post(
        `${API_URL}/adaptiveLearning/reminder`,
        { task, dueDate, time },
        getAuthHeaders()
      )
    );
  },

  dismissAlert: async (message) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/adaptiveLearning/dismissAlert`, { message }, getAuthHeaders())
    );
  },

  logActivity: async (activityData) => {
    return handleRequest(() =>
      axios.post(`${API_URL}/activities`, activityData, getAuthHeaders())
    );
  },
};

export default taskServices;
