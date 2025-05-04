// frontend/src/components/StudyPlanner/AnalyticsAndInsights.jsx
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
import './AnalyticsAndInsights.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsAndInsights = ({ tasks = [] }) => {
  const [timePeriod, setTimePeriod] = useState('week');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const overdueTasks = tasks.filter((t) => t.status === 'Overdue').length;
  const completionPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const subjects = [...new Set(tasks.map((t) => t.subject))].filter(Boolean);
  const studyTimeData = {
    labels: subjects.length ? subjects : ['No Subjects'],
    datasets: [
      {
        label: 'Time Spent (min)',
        data: subjects.length
          ? subjects.map((subject) =>
              tasks.filter((t) => t.subject === subject).reduce((sum, t) => sum + (t.timeSpent || 0), 0)
            )
          : [0],
        backgroundColor: '#007bff',
      },
    ],
  };

  const avgTasksPerDay = completedTasks / (timePeriod === 'week' ? 7 : 30) || 0;
  const mostTimeSubject = subjects.reduce((max, subject) => {
    const time = tasks
      .filter((t) => t.subject === subject)
      .reduce((sum, t) => sum + (t.timeSpent || 0), 0);
    return time > (max.time || 0) ? { subject, time } : max;
  }, { time: 0 });

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
      <div className="stats-section">
        <h4>Task Completion Stats</h4>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks} ({completionPercent.toFixed(1)}%)</p>
        <p>Pending: {pendingTasks}</p>
        <p>Overdue: {overdueTasks}</p>
      </div>
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
      <div className="insights-section">
        <h4>Productivity Insights</h4>
        <p>Average Tasks Completed per Day ({timePeriod}): {avgTasksPerDay.toFixed(2)}</p>
        <p>Most Time Spent: {mostTimeSubject.subject || 'N/A'} (
          {mostTimeSubject.time ? `${mostTimeSubject.time} min` : 'N/A'})
        </p>
      </div>
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
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string,
      dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      status: PropTypes.oneOf(['Pending', 'Completed', 'Overdue']).isRequired,
      timeSpent: PropTypes.number,
      completion: PropTypes.number,
      completionDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ),
};

export default AnalyticsAndInsights;