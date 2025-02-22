import  { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Library for calendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const LearningResources = () => {
  // Sample tasks with due dates and status
  const [tasks, setTasks] = useState([
    {
      title: 'Complete Python Basics',
      start: new Date(2025, 1, 18, 9, 0), // February 18th, 2025, 9:00 AM
      end: new Date(2025, 1, 18, 10, 0),  // February 18th, 2025, 10:00 AM
      status: 'completed', // can be 'completed', 'upcoming', or 'overdue'
    },
    {
      title: 'Study JavaScript Arrays',
      start: new Date(2025, 1, 19, 14, 0), // February 19th, 2025, 2:00 PM
      end: new Date(2025, 1, 19, 15, 0),  // February 19th, 2025, 3:00 PM
      status: 'upcoming',
    },
    {
      title: 'Practice Communication Skills',
      start: new Date(2025, 1, 17, 16, 0), // February 17th, 2025, 4:00 PM
      end: new Date(2025, 1, 17, 17, 0),  // February 17th, 2025, 5:00 PM
      status: 'overdue',
    },
  ]);

  // Function to handle the drag-and-drop feature
  const handleEventDrop = ({ event, start, end }) => {
    const updatedTasks = tasks.map((task) => 
      task.title === event.title 
        ? { ...task, start, end } 
        : task
    );
    setTasks(updatedTasks);
  };

  // Function to get color based on task status
  const getTaskColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745'; // Green
      case 'upcoming':
        return '#ffc107'; // Yellow
      case 'overdue':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Learning Resources</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Switch to Day View')} // You can implement Day view toggle here
        >
          Day View
        </button>
        <button
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('Switch to Month View')} // You can implement Month view toggle here
        >
          Month View
        </button>
      </div>

      <div>
        <Calendar
          localizer={localizer}
          events={tasks}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: '100%' }}
          onSelectEvent={(event) => alert(`Task: ${event.title}`)}
          onEventDrop={handleEventDrop}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: getTaskColor(event.status),
              borderRadius: '5px',
              color: 'white',
              padding: '10px',
            },
          })}
          views={['month', 'day']} // Allow users to toggle between day and month view
          selectable
        />
      </div>
    </div>
  );
};

export default LearningResources;
