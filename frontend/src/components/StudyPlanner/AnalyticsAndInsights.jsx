// frontend/src/components/StudyPlanner/AnalyticsAndInsights.jsx
import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PropTypes from 'prop-types';
import taskServices from '../../services/taskServices';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsAndInsights = ({ tasks = [] }) => {
  const [timePeriod, setTimePeriod] = useState('week');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const data = await taskServices.getAnalytics(timePeriod);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Failed to load analytics data.');
        // Fallback to client-side calculations
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
        const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
        const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
        const overdueTasks = tasks.filter((t) => t.status === 'Overdue').length;
        const completionPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        const subjects = [...new Set(tasks.map((t) => t.subject).filter(Boolean))];
        const studyTimeBySubject = subjects.map((subject) => ({
          subject,
          timeSpent: tasks
            .filter((t) => t.subject === subject)
            .reduce((sum, t) => sum + (t.timeSpent || 0), 0),
        }));
        const completedTasksInPeriod = tasks.filter(
          (t) =>
            t.status === 'Completed' &&
            t.completionDate &&
            new Date(t.completionDate) >=
              new Date(new Date().setDate(new Date().getDate() - (timePeriod === 'week' ? 7 : 30)))
        );
        const avgTasksPerDay = completedTasksInPeriod.length / (timePeriod === 'week' ? 7 : 30);
        const mostTimeSubject = studyTimeBySubject.reduce(
          (max, { subject, timeSpent }) => (timeSpent > (max.time || 0) ? { subject, time: timeSpent } : max),
          { time: 0 }
        );
        setAnalytics({
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,
          overdueTasks,
          completionPercent,
          studyTimeBySubject,
          avgTasksPerDay,
          mostTimeSubject,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [timePeriod, tasks]);

  if (loading) return <p className="text-center text-gray-500">Loading analytics...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!analytics || analytics.totalTasks === 0)
    return <p className="text-center text-gray-500">No analytics data available.</p>;

  const studyTimeData = {
    labels: analytics.studyTimeBySubject.length
      ? analytics.studyTimeBySubject.map((s) => s.subject)
      : ['No Subjects'],
    datasets: [
      {
        label: 'Time Spent (min)',
        data: analytics.studyTimeBySubject.length
          ? analytics.studyTimeBySubject.map((s) => s.timeSpent)
          : [0],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const trendData = {
    labels: ['Completed', 'Pending', 'In Progress', 'Overdue'],
    datasets: [
      {
        data: [
          analytics.completedTasks,
          analytics.pendingTasks,
          analytics.inProgressTasks,
          analytics.overdueTasks,
        ],
        backgroundColor: ['#22c55e', '#facc15', '#3b82f6', '#ef4444'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Analytics and Insights</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-4">Task Completion Stats</h4>
        <div className="grid grid-cols-2 gap-4">
          <p>Total Tasks: {analytics.totalTasks}</p>
          <p>Completed: {analytics.completedTasks} ({analytics.completionPercent.toFixed(1)}%)</p>
          <p>Pending: {analytics.pendingTasks}</p>
          <p>In Progress: {analytics.inProgressTasks}</p>
          <p>Overdue: {analytics.overdueTasks}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-4">Study Time Analytics</h4>
        <Bar
          data={studyTimeData}
          options={{
            responsive: true,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Minutes' } } },
            plugins: { legend: { display: true } },
          }}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-4">Productivity Insights</h4>
        <p>
          Average Tasks Completed per Day ({timePeriod}): {analytics.avgTasksPerDay.toFixed(2)}
        </p>
        <p>
          Most Time Spent: {analytics.mostTimeSubject.subject || 'N/A'} (
          {analytics.mostTimeSubject.time ? `${analytics.mostTimeSubject.time} min` : 'N/A'})
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium mb-4">Task Completion Trends</h4>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              timePeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setTimePeriod('week')}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              timePeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setTimePeriod('month')}
          >
            Monthly
          </button>
        </div>
        <Pie
          data={trendData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
          }}
        />
      </div>
    </div>
  );
};

AnalyticsAndInsights.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string,
      dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed', 'Overdue']).isRequired,
      timeSpent: PropTypes.number,
      completion: PropTypes.number,
      completionDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ),
};

export default AnalyticsAndInsights;