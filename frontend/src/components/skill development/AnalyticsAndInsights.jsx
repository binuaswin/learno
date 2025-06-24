//frontend/src/components/skill development/AnalyticsAndInsights.jsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/components/auth/Authcontext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsAndInsights = () => {
  const { user } = useAuth();
  const [timeSpentData, setTimeSpentData] = useState([]);
  const [skillsProgressStats, setSkillsProgressStats] = useState([]);
  const [comparativeData, setComparativeData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token || !user) {
          throw new Error('Please log in to view analytics.');
        }
        console.debug(`[${new Date().toISOString()}] AnalyticsAndInsights - Fetching data with GET ${API_URL}/api/skills/analytics`);

        const res = await axios.get(`${API_URL}/api/skills/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setTimeSpentData(res.data.timeSpentData || []);
        setSkillsProgressStats(res.data.progressStats || []);
        setComparativeData(res.data.comparativeData || { labels: [], datasets: [] });
      } catch (err) {
        console.error(`[${new Date().toISOString()}] AnalyticsAndInsights - Fetch error:`, err);
        const errorMsg = err.response?.data?.message || 'Failed to load analytics.';
        setError(errorMsg);
        toast.error(errorMsg);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setTimeout(() => window.location.href = '/login', 1000);
        } else if (err.response?.status === 404) {
          toast.error(`Analytics endpoint not found at ${API_URL}/api/skills/analytics. Ensure backend is running.`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [user, API_URL]);

  if (loading) {
    return (
      <div className="m-40 flex justify-center">
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-40 flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="m-10 flex flex-col gap-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-gray-800">Analytics and Insights</h2>

      {/* Time Spent on Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Time Spent on Skills</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left">Skill</th>
              <th className="p-3 border border-gray-300 text-left">Time Spent (Hours)</th>
            </tr>
          </thead>
          <tbody>
            {timeSpentData.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-3 border border-gray-300 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              timeSpentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{item.skill}</td>
                  <td className="p-3 border border-gray-300">{item.timeSpent}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Skills Progress Stats */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Skills Progress Stats</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left">Skill</th>
              <th className="p-3 border border-gray-300 text-left">Average Time (Hours)</th>
              <th className="p-3 border border-gray-300 text-left">Completed Exercises</th>
            </tr>
          </thead>
          <tbody>
            {skillsProgressStats.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-3 border border-gray-300 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              skillsProgressStats.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{item.skill}</td>
                  <td className="p-3 border border-gray-300">{item.averageTime}</td>
                  <td className="p-3 border border-gray-300">{item.completedExercises}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Comparative Analysis</h3>
        <p className="text-gray-600 mb-4">Compare your current skill progress with previous months.</p>
        {comparativeData.datasets.length === 0 ? (
          <p className="text-gray-500">No data available for comparison.</p>
        ) : (
          <Line
            data={comparativeData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Skill Progress Over Time' },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnalyticsAndInsights;