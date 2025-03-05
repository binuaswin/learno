import { useState } from 'react';
import { CheckCircle, Edit, Trash, PlusCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import TaskFiltersAndSorting from './TaskFiltersAndSorting';

const StudyTaskList = ({
  initialTasks = [
    {
      name: 'Study for History Exam',
      subject: 'History',
      dueDate: '02/15/2025',
      priority: 'High',
      status: 'Pending',
      timeEstimate: '2 hours',
    },
  ],
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    name: '',
    subject: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    timeEstimate: '',
  });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name || !newTask.subject || !newTask.dueDate) return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks too
    setNewTask({ name: '', subject: '', dueDate: '', priority: 'Medium', status: 'Pending', timeEstimate: '' });
  };

  // Handle editing a task
  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setNewTask(filteredTasks[index]);
  };

  // Handle saving edited task
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!newTask.name || !newTask.subject || !newTask.dueDate) return;
    const updatedTasks = tasks.map((task, i) => (i === editingTaskIndex ? newTask : task));
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks too
    setEditingTaskIndex(null);
    setNewTask({ name: '', subject: '', dueDate: '', priority: 'Medium', status: 'Pending', timeEstimate: '' });
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks too
  };

  // Handle marking a task as complete
  const handleMarkComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks too
  };

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <TaskFiltersAndSorting tasks={tasks} onFilterAndSort={setFilteredTasks} />
      <div className="filters">
        <button className="add-task-button" onClick={() => setEditingTaskIndex(null)}>
          <PlusCircle size={20} className="icon" />
          Add Task
        </button>
      </div>

      {/* Task Form for Add/Edit */}
      {(editingTaskIndex !== null || tasks.length === 0 || newTask.name) && (
        <form onSubmit={editingTaskIndex !== null ? handleSaveEdit : handleAddTask} className="task-form">
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task Name"
            className="task-input"
          />
          <input
            type="text"
            value={newTask.subject}
            onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
            placeholder="Subject"
            className="task-input"
          />
          <input
            type="text"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            placeholder="Due Date (e.g., 02/15/2025)"
            className="task-input"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className="task-select"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            value={newTask.timeEstimate}
            onChange={(e) => setNewTask({ ...newTask, timeEstimate: e.target.value })}
            placeholder="Time Estimate (e.g., 2 hours)"
            className="task-input"
          />
          <button type="submit" className="save-task-button">
            {editingTaskIndex !== null ? 'Save' : 'Add'}
          </button>
        </form>
      )}

      {/* Task List */}
      <div className="tasks">
        {filteredTasks.map((task, index) => (
          <div key={index} className="task-item">
            <div className="details">
              <p className="task-title">{task.name}</p>
              <p className="task-details">
                Subject: {task.subject} | Due Date: {task.dueDate} | Priority: {task.priority} | Status: {task.status}
                {task.timeEstimate && ` | Time: ${task.timeEstimate}`}
              </p>
            </div>
            <div className="actions">
              <CheckCircle
                size={20}
                className="icon complete-icon"
                onClick={() => handleMarkComplete(index)}
              />
              <Edit
                size={20}
                className="icon edit-icon"
                onClick={() => handleEditTask(index)}
              />
              <Trash
                size={20}
                className="icon delete-icon"
                onClick={() => handleDeleteTask(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

StudyTaskList.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
      timeEstimate: PropTypes.string,
    })
  ),
};

export default StudyTaskList;