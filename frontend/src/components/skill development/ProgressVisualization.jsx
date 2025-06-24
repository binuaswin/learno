//frontend/src/components/skill development/ProgressVisualization.jsx
import { useState, useEffect } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/components/auth/Authcontext';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, BarElement, CategoryScale, LinearScale);

const ProgressVisualization = () => {
  const { user } = useAuth();
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });
  const [progressData, setProgressData] = useState({ labels: [], datasets: [] });
  const [masteryData, setMasteryData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) {
          throw new Error('Please log in to view progress.');
        }
        console.debug(`[${new Date().toISOString()}] ProgressVisualization - Fetching data with GET ${API_URL}/api/skills/charts`);

        const res = await axios.get(`${API_URL}/api/skills/charts`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.debug(`[${new Date().toISOString()}] ProgressVisualization - Response:`, res.data);

        setCategoryData(res.data.categoryData || { labels: [], datasets: [] });
        setProgressData(res.data.progressData || { labels: [], datasets: [] });
        setMasteryData(res.data.masteryData || { labels: [], datasets: [] });
      } catch (err) {
        console.error(`[${new Date().toISOString()}] ProgressVisualization - Fetch error:`, {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: `${API_URL}/api/skills/charts`,
        });
        const errorMsg = err.response?.data?.message || 'Failed to load chart data.';
        setError(errorMsg);
        toast.error(errorMsg);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setTimeout(() => window.location.href = '/login', 1000);
        } else if (err.response?.status === 404) {
          toast.error(`Charts endpoint not found at ${API_URL}/api/skills/charts. Ensure backend is running.`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChartData();
    }
  }, [user, API_URL]);

  if (loading) {
    return (
      <div className="m-10 flex justify-center">
        <p className="text-gray-600">Loading charts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10 flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="m-6 flex flex-col gap-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-gray-800">Analytics Dashboard</h2>

      {/* Skill Categories Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Skill Categories</h3>
        {categoryData.labels.length === 0 ? (
          <p className="text-gray-500 text-center">No category data available.</p>
        ) : (
          <Pie
            data={categoryData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
            }}
          />
        )}
      </div>

      {/* Progress Over Time */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Progress Over Time</h3>
        {progressData.labels.length === 0 ? (
          <p className="text-gray-500 text-center">No progress data available.</p>
        ) : (
          <Line
            data={progressData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
            }}
          />
        )}
      </div>

      {/* Skills Mastery Levels */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Skill Levels</h3>
        {masteryData.labels.length === 0 ? (
          <p className="text-gray-500 text-center">No mastery data available.</p>
        ) : (
          <Bar
            data={masteryData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 3,
                  ticks: {
                    callback: (value) => ['Beginner', 'Intermediate', 'Advanced'][value - 1] || value,
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressVisualization;