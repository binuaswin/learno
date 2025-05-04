// frontend/src/components/StudyPlanner/TaskList.jsx
import  { useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Read Chapter 5', subject: 'Math', completed: false },
    { id: 2, name: 'Complete Assignment', subject: 'Physics', completed: true },
    { id: 3, name: 'Practice Problems', subject: 'Chemistry', completed: false },
  ]);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : 'pending'}>
            <span>{task.name} - <em>{task.subject}</em></span>
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
