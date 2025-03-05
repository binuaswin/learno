import { useState } from 'react';
import PropTypes from 'prop-types';

const TaskProgressTracker = ({
  tasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      dueDate: '2025-02-15',
      completion: 75, // Percentage
      timeSpent: 60,  // Minutes
      timeEstimate: 120, // Minutes
    },
  ],
  onProgressUpdate = () => {},
}) => {
  const [taskProgress, setTaskProgress] = useState(tasks);

  // Calculate time left based on current date and due date
  const calculateTimeLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `${diffDays} days` : 'Overdue';
  };

  // Update completion percentage
  const handleCompletionChange = (taskId, newCompletion) => {
    const updatedTasks = taskProgress.map((task) =>
      task.id === taskId ? { ...task, completion: Math.max(0, Math.min(100, newCompletion)) } : task
    );
    setTaskProgress(updatedTasks);
    onProgressUpdate(updatedTasks);
  };

  return (
    <div className="task-progress-tracker">
      <h3>Task Progress</h3>
      <div className="progress-list">
        {taskProgress.map((task) => (
          <div key={task.id} className="progress-item">
            <div className="task-info">
              <p className="task-name">{task.name}</p>
              <p className="task-details">
                Completion: {task.completion}% | Time Spent: {task.timeSpent} min | 
                Time Left: {calculateTimeLeft(task.dueDate)}
                {task.timeEstimate && ` | Estimated: ${task.timeEstimate} min`}
              </p>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${task.completion}%` }}
                ></div>
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
  ),
  onProgressUpdate: PropTypes.func,
};

export default TaskProgressTracker;