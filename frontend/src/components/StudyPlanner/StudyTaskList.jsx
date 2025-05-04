// frontend/src/components/StudyPlanner/StudyTaskList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import './StudyTaskList.css';

const StudyTaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'Medium',
    subject: '',
    status: 'Pending',
  });

  // Guard for invalid tasks
  if (!Array.isArray(tasks)) {
    return (
      <div className="study-task-list">
        <p className="error">Unable to load tasks. Please try again.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate || !newTask.subject) {
      alert('Please fill in all required fields.');
      return;
    }
    onAddTask(newTask);
    setNewTask({ title: '', dueDate: '', priority: 'Medium', subject: '', status: 'Pending' });
  };

  const toggleCompletion = (task) => {
    const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    onUpdateTask(task._id, { ...task, status: updatedStatus });
  };

  return (
    <div className="study-task-list">
      <h3>Study Tasks</h3>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
        />
        <input
          type="text"
          value={newTask.subject}
          onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
          placeholder="Subject"
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
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.status === 'Completed' ? 'completed' : 'pending'}>
            <span>
              {task.title} - {task.subject} - Due: {new Date(task.dueDate).toLocaleDateString()} - {task.priority}
            </span>
            <button onClick={() => toggleCompletion(task)}>
              {task.status === 'Completed' ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

StudyTaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['Pending', 'Completed', 'Overdue']).isRequired,
    })
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default StudyTaskList;