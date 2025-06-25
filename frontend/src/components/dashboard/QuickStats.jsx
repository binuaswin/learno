//frontend/src/components/dashboard/QuickStats.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './QuickStats.css';

const QuickStats = ({ userId }) => {
  const [learningProgress, setLearningProgress] = useState(0);
  const [skillsLearned, setSkillsLearned] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate Task Completion Rate
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/dashboard/quick-stats/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const stats = response.data;
        setLearningProgress(stats.learningProgress || 0);
        setSkillsLearned(Array.isArray(stats.skillsLearned) ? stats.skillsLearned : []);
        setUpcomingGoals(Array.isArray(stats.upcomingGoals) ? stats.upcomingGoals : []);
        setCompletedTasks(stats.completedTasks || 0);
        setTotalTasks(stats.totalTasks || 0);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch quick stats');
        setLoading(false);
        console.error('Error fetching Quick Stats:', error);
      }
    };

    if (userId) fetchQuickStats();
  }, [userId]);

  if (loading) return <section className="quick-stats">Loading...</section>;
  if (error) return <section className="quick-stats">{error}</section>;

  return (
    <section className="quick-stats">
      <div className="stat-card">
        <h3>Learning Progress</h3>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${learningProgress}%` }}>
            {learningProgress.toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h3>Skill Development</h3>
        <ul>
          {skillsLearned.length > 0 ? (
            skillsLearned.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills learned yet</li>
          )}
        </ul>
        <p>Upcoming Goals:</p>
        <ul>
          {upcomingGoals.length > 0 ? (
            upcomingGoals.map((goal, index) => <li key={index}>{goal}</li>)
          ) : (
            <li>No upcoming goals</li>
          )}
        </ul>
      </div>

      <div className="stat-card">
        <h3>Planner Overview</h3>
        <p>Completed Tasks: {completedTasks} / {totalTasks}</p>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${taskCompletionRate}%` }}>
            {taskCompletionRate.toFixed(0)}%
          </div>
        </div>
      </div>
    </section>
  );
};

QuickStats.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default QuickStats;
