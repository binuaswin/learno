// frontend/src/hooks/useTasks.jsx
import { useState, useEffect } from 'react';
import taskServices from '../services/taskServices.js';

export const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID not available');
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskList = await taskServices.fetchTasks();
        setTasks(Array.isArray(taskList) ? taskList : []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return { tasks, setTasks, loading, error };
};