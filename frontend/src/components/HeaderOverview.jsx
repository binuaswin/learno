// HeaderOverview.jsx
import './HeaderOverview.css';

const HeaderOverview = () => {
  const totalTasks = 15;
  const completedTasks = 10;
  const overdueTasks = 2;
  const completionRate = (completedTasks / totalTasks) * 100;

  const getMotivationalMessage = () => {
    if (completionRate === 100) {
      return 'Excellent work! You’ve completed all tasks!';
    } else if (completionRate >= 75) {
      return 'Great job! Keep pushing to reach your goals.';
    } else if (completionRate >= 50) {
      return 'Good progress! Stay consistent and finish strong.';
    } else {
      return 'Start small, but don’t stop. You can do it!';
    }
  };

  return (
    <header className="header-overview">
      <h1>Study Planner</h1>
      <p>Plan, track, and achieve your study goals efficiently.</p>
      <div className="overview">
        <div className="stats">
          <p>Total Tasks: <strong>{totalTasks}</strong></p>
          <p>Completed Tasks: <strong>{completedTasks}</strong></p>
          <p>Overdue Tasks: <strong>{overdueTasks}</strong></p>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${completionRate}%`, backgroundColor: completionRate >= 75 ? 'green' : 'orange' }}
          >
            {completionRate.toFixed(0)}%
          </div>
        </div>
        <p className="motivational-message">{getMotivationalMessage()}</p>
      </div>
    </header>
  );
};

export default HeaderOverview;
