// File: frontend/src/components/AddTaskForm.jsx
import { useState } from 'react';
import './AddTaskForm.css';
import PropTypes from 'prop-types';

const AddTaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !subject || !deadline) {
      alert('Please fill in all fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      subject,
      deadline,
      priority,
      completed: false,
    };

    onAddTask(newTask);
    setTaskName('');
    setSubject('');
    setDeadline('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h3>Add a New Task</h3>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default AddTaskForm;