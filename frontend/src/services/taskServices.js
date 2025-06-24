// frontend/src/services/taskServices.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found. Please log in.');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const taskServices = {
  fetchTasks: async () => {
    const response = await axios.get(`${API_URL}/tasks`, getAuthHeaders());
    return response.data.tasks;
  },
  filterTasks: async (filters) => {
    const response = await axios.get(`${API_URL}/tasks/filter`, {
      ...getAuthHeaders(),
      params: filters,
    });
    return response.data.tasks;
  },
  addTask: async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
    return response.data.tasks[0];
  },
  updateTask: async (taskId, taskData) => {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeaders());
    return response.data.tasks[0];
  },
  deleteTask: async (taskId) => {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  },
  setReminder: async (reminderData) => {
    const response = await axios.post(`${API_URL}/tasks/reminder`, reminderData, getAuthHeaders());
    return response.data.reminder;
  },
  getSettings: async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}/settings`, getAuthHeaders());
    return response.data.settings;
  },
  updateSettings: async (userId, settingsData) => {
    const response = await axios.put(`${API_URL}/users/${userId}/settings`, settingsData, getAuthHeaders());
    return response.data.settings;
  },
  addCategory: async (userId, category) => {
    console.log('Mock: Adding category', { userId, category });
    return { category };
  },
  syncData: async (userId, syncData) => {
    console.log('Mock: Syncing data', { userId, syncData });
    return { success: true };
  },
  getAnalytics: async (period) => {
    const response = await axios.get(`${API_URL}/analytics`, {
      ...getAuthHeaders(),
      params: { period },
    });
    return response.data;
  },
  getAdaptiveLearningData: async () => {
    const response = await axios.get(`${API_URL}/adaptiveLearning`, getAuthHeaders());
    return response.data;
  },
  updateAdaptiveLearningData: async (data) => {
    const response = await axios.put(`${API_URL}/adaptiveLearning`, data, getAuthHeaders());
    return response.data.learningData;
  },
  updateLearningGoal: async (learningGoal) => {
    const response = await axios.put(`${API_URL}/adaptiveLearning/learningGoal`, { learningGoal }, getAuthHeaders());
    return response.data.learningGoal;
  },
  startModule: async (moduleTitle) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/startModule`, { moduleTitle }, getAuthHeaders());
    return response.data;
  },
  updateRecommendation: async (moduleTitle, action, difficulty) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/recommendation`, { moduleTitle, action, difficulty }, getAuthHeaders());
    return response.data.recommendations;
  },
  updateTimeSpent: async (task, hours) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/timeSpent`, { task, hours }, getAuthHeaders());
    return response.data.timeSpent;
  },
  submitQuiz: async (title, score) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/quiz`, { title, score }, getAuthHeaders());
    return response.data.quizzes;
  },
  submitExercise: async (title, result) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/exercise`, { title, result }, getAuthHeaders());
    return response.data.exercises;
  },
  addGoal: async (skill, target) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/goal`, { skill, target }, getAuthHeaders());
    return response.data.goals;
  },
  incrementStreak: async () => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/streak`, {}, getAuthHeaders());
    return response.data.streak;
  },
  updateLearningMode: async (learningMode) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/learningMode`, learningMode, getAuthHeaders());
    return response.data.learningMode;
  },
  updateMilestone: async (title, achieved) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/milestone`, { title, achieved }, getAuthHeaders());
    return response.data.milestones;
  },
  addReflection: async (module, note) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/reflection`, { module, note }, getAuthHeaders());
    return response.data.reflection;
  },
  addFeedback: async (module, comment, rating) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/feedback`, { module, comment, rating }, getAuthHeaders());
    return response.data.feedback;
  },
  addReminder: async (task, dueDate, time) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/reminder`, { task, dueDate, time }, getAuthHeaders());
    return response.data.reminders;
  },
  dismissAlert: async (message) => {
    const response = await axios.post(`${API_URL}/adaptiveLearning/dismissAlert`, { message }, getAuthHeaders());
    return response.data.alerts;
  },
};

export default taskServices;