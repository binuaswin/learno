import  { useState } from 'react';
import Calendar from 'react-calendar'; // You can use a library like 'react-calendar'
import './TaskCalendar.css';
import PropTypes from 'prop-types';

const TaskCalendar = ({ tasks }) => {
  const [date, setDate] = useState(new Date());

  // Filter tasks by the selected date
  const tasksForDate = tasks.filter(task => new Date(task.deadline).toDateString() === date.toDateString());

  return (
    <div className="task-calendar">
      <h2>Task Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <div className="tasks-for-date">
        <h3>Tasks for {date.toDateString()}</h3>
        <ul>
          {tasksForDate.map(task => (
            <li key={task.id}>{task.name} - {task.priority}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
TaskCalendar.propTypes = {
    tasks: PropTypes.array.isRequired,
}

export default TaskCalendar;
