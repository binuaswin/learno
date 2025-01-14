import  { useState, useEffect } from 'react';
import './ProgressDashboard.css';

const ProgressDashboard = () => {
  // Example static user data
  const userName = "John Doe";  // This can be fetched dynamically from authentication data
  const completedLearningModules = 7;  // Example completed modules
  const totalLearningModules = 10; // Total modules
  const skillsLearned = ['JavaScript', 'React', 'CSS'];  // Example learned skills
  const upcomingGoals = ['Complete Node.js module', 'Master AI concepts']; // Upcoming goals
  const totalTasks = 15;  // Total number of tasks
  const completedTasks = 10;  // Completed tasks

  // Get current date and time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const learningProgress = (completedLearningModules / totalLearningModules) * 100;
  const taskCompletionRate = (completedTasks / totalTasks) * 100;

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <header className="dashboard-header">
        <h1>Welcome back, {userName}!</h1>
        <p>{currentTime}</p> {/* Display current date and time */}
      </header>

      {/* Quick Stats Section */}
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
            {skillsLearned.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <p>Upcoming Goals:</p>
          <ul>
            {upcomingGoals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
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

      {/* Other sections like progress, tasks, goals, etc. */}
      <section className="progress-overview">
        <h2>Your Progress</h2>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "70%" }}>
            70%
          </div>
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section className="upcoming-tasks">
        <h2>Upcoming Tasks</h2>
        <ul>
          {/* Example task */}
          <li>
            <span className="task-name">Complete Module 1</span>
            <span className="due-date">2025-01-20</span>
          </li>
        </ul>
      </section>

      {/* Study Goals */}
      <section className="study-goals">
        <h2>Your Study Goals</h2>
        <ul>
          <li>
            <span className="goal-text">Study 15 hours this week</span>
            <span className="goal-status in-progress">In Progress</span>
          </li>
        </ul>
      </section>

      {/* Insights */}
      <section className="insights">
        <h2>Personalized Insights</h2>
        <p>You are doing great! Keep pushing toward your goals.</p>
      </section>
    </div>
  );
};

export default ProgressDashboard;
