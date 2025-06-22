import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const PersonalizedRemindersAndNotifications = ({ taskReminders, activityAlerts, motivationalMessages }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');

  const handleAddReminder = async () => {
    if (!task.trim() || !dueDate || !time) {
      toast.error('Task, due date, and time are required.');
      return;
    }
    try {
      await taskServices.addReminder(task, dueDate, time);
      toast.success('Reminder added successfully!');
      setTask('');
      setDueDate('');
      setTime('');
    } catch (err) {
      console.error('Failed to add reminder:', err);
      toast.error(err.message || 'Failed to add reminder.');
    }
  };

  const handleDismissAlert = async (message) => {
    try {
      await taskServices.dismissAlert(message);
      toast.success('Alert dismissed successfully!');
    } catch (err) {
      console.error('Failed to dismiss alert:', err);
      toast.error(err.message || 'Failed to dismiss alert.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Reminders & Notifications</h2>

      {/* Task Reminders */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Task Reminders</h3>
        {taskReminders.length ? (
          <ul className="space-y-2">
            {taskReminders.map((reminder, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{reminder.task}</p>
                <p className="text-gray-600">Due: {reminder.dueDate} at {reminder.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reminders set.</p>
        )}
      </div>

      {/* Add Reminder */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Add Reminder</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="task" className="text-gray-700">Task</label>
            <input
              id="task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task name"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="dueDate" className="text-gray-700">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="time" className="text-gray-700">Time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddReminder}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Reminder
          </button>
        </div>
      </div>

      {/* Activity Alerts */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Activity Alerts</h3>
        {activityAlerts.length ? (
          <ul className="space-y-2">
            {activityAlerts.map((alert, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800">{alert.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(alert.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDismissAlert(alert.message)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Dismiss
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No alerts available.</p>
        )}
      </div>

      {/* Motivational Messages */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Motivational Messages</h3>
        {motivationalMessages.length ? (
          <ul className="space-y-2">
            {motivationalMessages.map((message, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="text-gray-800">💪 {message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No motivational messages available.</p>
        )}
      </div>
    </div>
  );
};

PersonalizedRemindersAndNotifications.propTypes = {
  taskReminders: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
  activityAlerts: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  motivationalMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PersonalizedRemindersAndNotifications;