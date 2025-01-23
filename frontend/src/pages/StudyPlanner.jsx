import  { useState } from 'react';
import HeaderOverview from '../components/HeaderOverview';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import TaskCalendar from '../components/TaskCalendar';
import TaskAnalytics from '../components/TaskAnalytics';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="study-planner">
      <HeaderOverview tasks={tasks} />
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDeleteTask} 
        onEdit={handleEditTask} 
        onComplete={handleCompleteTask} 
      />
      <TaskCalendar tasks={tasks} />
      <TaskAnalytics tasks={tasks} />
    </div>
  );
};

export default StudyPlanner;
