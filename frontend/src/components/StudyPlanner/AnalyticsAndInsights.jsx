import { useState } from 'react';
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

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsAndInsights = ({
  tasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      subject: 'History',
      dueDate: '2025-02-15',
      status: 'Completed',
      timeSpent: 60, // Minutes
      completionDate: '2025-02-10',
    },
    {
      id: '2',
      name: 'Math Homework',
      subject: 'Math',
      dueDate: '2025-02-16',
      status: 'Pending',
      timeSpent: 30,
    },
  ],
}) => {
  const [timePeriod, setTimePeriod] = useState('week'); // 'week' or 'month'

  // Task Completion Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const overdueTasks = tasks.filter(
    (t) => t.status !== 'Completed' && new Date(t.dueDate) < new Date()
  ).length;
  const completionPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Study Time Analytics (Bar Chart)
  const subjects = [...new Set(tasks.map((t) => t.subject))];
  const studyTimeData = {
    labels: subjects,
    datasets: [
      {
        label: 'Time Spent (min)',
        data: subjects.map((subject) =>
          tasks.filter((t) => t.subject === subject).reduce((sum, t) => sum + (t.timeSpent || 0), 0)
        ),
        backgroundColor: '#007bff',
      },
    ],
  };

  // Productivity Insights
  const avgTasksPerDay =
    completedTasks / (timePeriod === 'week' ? 7 : 30) || 0;
  const bestStudyTime = () => {
    const hours = tasks
      .filter((t) => t.completionDate)
      .map((t) => new Date(t.completionDate).getHours());
    const hourCounts = hours.reduce((acc, hour) => {
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});
    const bestHour = Object.keys(hourCounts).reduce((a, b) =>
      hourCounts[a] > hourCounts[b] ? a : b
    );
    return `${bestHour}:00 - ${parseInt(bestHour, 10) + 1}:00`;
  };
  const mostTimeSubject = subjects.reduce((max, subject) => {
    const time = tasks
      .filter((t) => t.subject === subject)
      .reduce((sum, t) => sum + (t.timeSpent || 0), 0);
    return time > (max.time || 0) ? { subject, time } : max;
  }, {});

  // Trends (Pie Chart for simplicity)
  const trendData = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  return (
    <div className="analytics-insights">
      <h3>Analytics and Insights</h3>

      {/* Task Completion Stats */}
      <div className="stats-section">
        <h4>Task Completion Stats</h4>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks} ({completionPercent.toFixed(1)}%)</p>
        <p>Pending: {pendingTasks}</p>
        <p>Overdue: {overdueTasks}</p>
      </div>

      {/* Study Time Analytics */}
      <div className="time-analytics-section">
        <h4>Study Time Analytics</h4>
        <Bar
          data={studyTimeData}
          options={{
            responsive: true,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Minutes' } } },
          }}
        />
      </div>

      {/* Productivity Insights */}
      <div className="insights-section">
        <h4>Productivity Insights</h4>
        <p>Average Tasks Completed per Day ({timePeriod}): {avgTasksPerDay.toFixed(2)}</p>
        <p>Best Study Time: {tasks.length > 0 ? bestStudyTime() : 'N/A'}</p>
        <p>
          Most Time Spent: {mostTimeSubject.subject || 'N/A'} (
          {mostTimeSubject.time ? `${mostTimeSubject.time} min` : 'N/A'})
        </p>
      </div>

      {/* Trends */}
      <div className="trends-section">
        <h4>Task Completion Trends</h4>
        <div className="trend-toggle">
          <button
            className={`toggle-button ${timePeriod === 'week' ? 'active' : ''}`}
            onClick={() => setTimePeriod('week')}
          >
            Weekly
          </button>
          <button
            className={`toggle-button ${timePeriod === 'month' ? 'active' : ''}`}
            onClick={() => setTimePeriod('month')}
          >
            Monthly
          </button>
        </div>
        <Pie data={trendData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

AnalyticsAndInsights.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
      timeSpent: PropTypes.number,
      completionDate: PropTypes.string,
    })
  ),
};

export default AnalyticsAndInsights;