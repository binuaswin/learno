// frontend/src/components/StudyPlanner/ChartSection.jsx
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import taskServices from '../../services/taskServices';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartSection = ({ progress }) => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgressTrend = async () => {
      setLoading(true);
      try {
        const response = await taskServices.getAnalytics('month');
        const tasks = response.tasks || [];
        const dailyProgress = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        for (let i = 0; i < 30; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dayTasks = tasks.filter(
            (t) =>
              t.completionDate &&
              new Date(t.completionDate).toDateString() === date.toDateString()
          );
          const dayCompletion = dayTasks.reduce((sum, t) => sum + (t.completion || 0), 0);
          dailyProgress.push(
            dayTasks.length > 0 ? dayCompletion / dayTasks.length : 0
          );
        }
        setProgressData(dailyProgress);
      } catch (err) {
        console.error('Failed to fetch progress trend:', err);
        setProgressData(new Array(30).fill(progress / 30));
      } finally {
        setLoading(false);
      }
    };
    fetchProgressTrend();
  }, [progress]);

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Average Completion (%)',
        data: progressData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-medium mb-4">Progress Trend (30 Days)</h4>
      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } },
            },
            plugins: { legend: { display: true } },
          }}
        />
      )}
    </div>
  );
};

ChartSection.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ChartSection;