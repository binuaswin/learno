import { useState } from 'react';
import PropTypes from 'prop-types';

const DailyWeeklyOverview = ({
  tasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      subject: 'History',
      dueDate: new Date().toISOString().split('T')[0], // Today
      priority: 'High',
      status: 'Pending',
      completionDate: null,
    },
    {
      id: '2',
      name: 'Math Homework',
      subject: 'Math',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
      priority: 'Medium',
      status: 'Completed',
      completionDate: new Date().toISOString().split('T')[0], // Today
    },
  ],
}) => {
  const [view, setView] = useState('daily'); // 'daily' or 'weekly'

  // Get current date and week boundaries
  const today = new Date().toISOString().split('T')[0];
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // End of week (Saturday)
  const weekStartStr = weekStart.toISOString().split('T')[0];
  const weekEndStr = weekEnd.toISOString().split('T')[0];

  // Filter tasks for daily view
  const dailyTasks = tasks.filter((task) => task.dueDate === today);
  const dailyCompleted = tasks.filter(
    (task) => task.completionDate === today && task.status === 'Completed'
  );

  // Filter tasks for weekly view
  const weeklyTasks = tasks.filter(
    (task) => task.dueDate >= weekStartStr && task.dueDate <= weekEndStr
  );
  const weeklyCompleted = tasks.filter(
    (task) =>
      task.completionDate >= weekStartStr &&
      task.completionDate <= weekEndStr &&
      task.status === 'Completed'
  );

  // Significant achievements (e.g., high-priority tasks completed)
  const getAchievements = (completedTasks) =>
    completedTasks.filter((task) => task.priority === 'High').length > 0
      ? 'You completed high-priority tasks—awesome work!'
      : null;

  return (
    <div className="daily-weekly-overview">
      <h3>Daily/Weekly Overview</h3>
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === 'daily' ? 'active' : ''}`}
          onClick={() => setView('daily')}
        >
          Daily
        </button>
        <button
          className={`toggle-button ${view === 'weekly' ? 'active' : ''}`}
          onClick={() => setView('weekly')}
        >
          Weekly
        </button>
      </div>

      {view === 'daily' ? (
        <>
          {/* Daily Summary */}
          <div className="daily-summary">
            <h4>Today’s Summary ({today})</h4>
            {dailyTasks.length > 0 ? (
              <ul className="task-list">
                {dailyTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <span className="task-name">{task.name}</span>
                    <span className="task-details">
                      Priority: {task.priority} | Status: {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks scheduled for today.</p>
            )}
          </div>

          {/* Daily Recap */}
          <div className="task-recap">
            <h4>Today’s Recap</h4>
            {dailyCompleted.length > 0 ? (
              <>
                <p>Completed: {dailyCompleted.length} task{dailyCompleted.length > 1 ? 's' : ''}</p>
                <ul className="completed-list">
                  {dailyCompleted.map((task) => (
                    <li key={task.id} className="completed-item">
                      {task.name}
                    </li>
                  ))}
                </ul>
                {getAchievements(dailyCompleted) && (
                  <p className="achievement">{getAchievements(dailyCompleted)}</p>
                )}
              </>
            ) : (
              <p>No tasks completed today yet.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Weekly Overview */}
          <div className="weekly-overview">
            <h4>Weekly Overview ({weekStartStr} - {weekEndStr})</h4>
            {weeklyTasks.length > 0 ? (
              <ul className="task-list">
                {weeklyTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <span className="task-name">{task.name}</span>
                    <span className="task-details">
                      Due: {task.dueDate} | Priority: {task.priority} | Status: {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks scheduled this week.</p>
            )}
          </div>

          {/* Weekly Recap */}
          <div className="task-recap">
            <h4>Weekly Recap</h4>
            {weeklyCompleted.length > 0 ? (
              <>
                <p>Completed: {weeklyCompleted.length} task{weeklyCompleted.length > 1 ? 's' : ''}</p>
                <ul className="completed-list">
                  {weeklyCompleted.map((task) => (
                    <li key={task.id} className="completed-item">
                      {task.name} (Completed: {task.completionDate})
                    </li>
                  ))}
                </ul>
                {getAchievements(weeklyCompleted) && (
                  <p className="achievement">{getAchievements(weeklyCompleted)}</p>
                )}
              </>
            ) : (
              <p>No tasks completed this week yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

DailyWeeklyOverview.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
      completionDate: PropTypes.string,
    })
  ),
};

export default DailyWeeklyOverview;