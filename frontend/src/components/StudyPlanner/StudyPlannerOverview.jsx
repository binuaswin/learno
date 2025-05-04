// frontend/src/components/StudyPlanner/StudyPlannerOverview.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './StudyPlannerOverview.css';

const OverviewSection = ({ userName, tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
  });
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  // Guard for invalid tasks
  if (!Array.isArray(tasks)) {
    return (
      <div className="overview-section">
        <h3>Welcome, {userName}</h3>
        <p className="error">Unable to load tasks. Please try again later.</p>
      </div>
    );
  }

  // Add or update task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) {
      setError('Title and due date are required.');
      return;
    }
    if (editingTask) {
      onUpdateTask(editingTask._id, newTask);
      setEditingTask(null);
    } else {
      onAddTask(newTask);
    }
    setNewTask({ title: '', dueDate: '', priority: 'Medium', status: 'Pending' });
    setError('');
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
    setError('');
  };

  // Task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const overdueTasks = tasks.filter((t) => t.status === 'Overdue').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <div className="overview-section">
      <h3>Welcome, {userName}</h3>
      {error && <p className="error">{error}</p>}

      {/* Task Stats */}
      <div className="stats-section">
        <h4>Task Overview</h4>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks} ({completionRate}%)</p>
        <p>Pending: {pendingTasks}</p>
        <p>Overdue: {overdueTasks}</p>
      </div>

      {/* Task Form */}
      <div className="task-form-section">
        <h4>{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button type="submit" className="submit-btn">
            <Plus size={18} /> {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
        {editingTask && (
          <button
            onClick={() => {
              setEditingTask(null);
              setNewTask({ title: '', dueDate: '', priority: 'Medium', status: 'Pending' });
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className="tasks-section">
        <h4>Tasks</h4>
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEditTask(task)} className="edit-btn">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => onDeleteTask(task._id)} className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks available</p>
        )}
      </div>
    </div>
  );
};

OverviewSection.propTypes = {
  userName: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['Pending', 'Completed', 'Overdue']).isRequired,
    })
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

OverviewSection.defaultProps = {
  tasks: [],
};

export default OverviewSection;