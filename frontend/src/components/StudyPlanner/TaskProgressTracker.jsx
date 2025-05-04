// frontend/src/components/StudyPlanner/TaskProgressTracker.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskProgressTracker = ({ tasks = [], onProgressUpdate }) => {
  const [, setTaskProgress] = useState(tasks);

  if (!Array.isArray(tasks)) {
    return <div className="task-progress-tracker"><p className="error">Unable to load tasks. Please try again.</p></div>;
  }

  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `${diffDays} days` : 'Overdue';
  };

  const handleCompletionChange = (taskId, newCompletion) => {
    const completion = Math.max(0, Math.min(100, newCompletion));
    setTaskProgress(tasks.map((task) => task.id === taskId ? { ...task, completion } : task));
    onProgressUpdate(taskId, completion);
  };

  return (
    <div className="task-progress-tracker">
      <h3>Task Progress</h3>
      <div className="progress-list">
        {tasks.map((task) => (
          <div key={task.id} className="progress-item">
            <div className="task-info">
              <p className="task-name">{task.name}</p>
              <p className="task-details">
                Completion: {task.completion}% | Time Spent: {task.timeSpent} min | 
                Time Left: {calculateTimeLeft(task.dueDate)}
                {task.timeEstimate ? ` | Estimated: ${task.timeEstimate} min` : ''}
              </p>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${task.completion}%` }}></div>
              </div>
              <input
                type="number"
                value={task.completion}
                onChange={(e) => handleCompletionChange(task.id, parseInt(e.target.value, 10))}
                min="0"
                max="100"
                className="completion-input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TaskProgressTracker.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      completion: PropTypes.number.isRequired,
      timeSpent: PropTypes.number.isRequired,
      timeEstimate: PropTypes.number,
    })
  ).isRequired,
  onProgressUpdate: PropTypes.func.isRequired,
};

export default TaskProgressTracker;