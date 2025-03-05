import { useState } from 'react';
import PropTypes from 'prop-types';

const NotificationsAndReminders = ({
  tasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      dueDate: '2025-02-15',
      priority: 'High',
      status: 'Pending',
    },
  ],
  onReminderSet = () => {},
}) => {
  const [customReminder, setCustomReminder] = useState({
    taskId: '',
    message: '',
    time: '',
  });
  const [reminders, setReminders] = useState([]);

  // Calculate if a task is due soon (within 2 days) or overdue
  const isDueSoonOrOverdue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'due-soon';
    return '';
  };

  // Handle custom reminder submission
  const handleSetReminder = (e) => {
    e.preventDefault();
    if (!customReminder.taskId || !customReminder.message || !customReminder.time) return;
    const newReminder = {
      ...customReminder,
      id: Date.now().toString(), // Simple unique ID
      type: 'custom',
    };
    setReminders([...reminders, newReminder]);
    onReminderSet(newReminder);
    setCustomReminder({ taskId: '', message: '', time: '' });
  };

  // Generate study session reminders (example logic)
  const studySessionReminders = [
    { id: 'session-1', message: 'Time to start your study session!', time: 'Now' },
    { id: 'break-1', message: 'Take a 5-minute break.', time: 'In 25 minutes' },
  ];

  // Filter tasks for notifications
  const upcomingAlerts = tasks.filter((task) => isDueSoonOrOverdue(task.dueDate) !== '');

  return (
    <div className="notifications-reminders">
      <h3>Notifications and Reminders</h3>

      {/* Upcoming Tasks Alerts */}
      <div className="alert-section">
        <h4>Upcoming Tasks</h4>
        {upcomingAlerts.length > 0 ? (
          <ul className="alert-list">
            {upcomingAlerts.map((task) => (
              <li
                key={task.id}
                className={`alert-item ${isDueSoonOrOverdue(task.dueDate)}`}
              >
                <span className="alert-message">
                  {task.name} - Due: {task.dueDate} ({isDueSoonOrOverdue(task.dueDate) === 'overdue' ? 'Overdue' : 'Due Soon'})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming or overdue tasks.</p>
        )}
      </div>

      {/* Study Session Reminders */}
      <div className="reminder-section">
        <h4>Study Session Reminders</h4>
        <ul className="reminder-list">
          {studySessionReminders.map((reminder) => (
            <li key={reminder.id} className="reminder-item">
              <span className="reminder-message">{reminder.message} - {reminder.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Custom Reminders */}
      <div className="custom-reminder-section">
        <h4>Custom Reminders</h4>
        <form onSubmit={handleSetReminder} className="custom-reminder-form">
          <select
            value={customReminder.taskId}
            onChange={(e) => setCustomReminder({ ...customReminder, taskId: e.target.value })}
            className="task-select"
          >
            <option value="">Select a Task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={customReminder.message}
            onChange={(e) => setCustomReminder({ ...customReminder, message: e.target.value })}
            placeholder="Reminder Message"
            className="reminder-input"
          />
          <input
            type="datetime-local"
            value={customReminder.time}
            onChange={(e) => setCustomReminder({ ...customReminder, time: e.target.value })}
            className="reminder-time"
          />
          <button type="submit" className="set-reminder-button">
            Set Reminder
          </button>
        </form>

        {reminders.length > 0 && (
          <ul className="reminder-list">
            {reminders.map((reminder) => (
              <li key={reminder.id} className="reminder-item">
                <span className="reminder-message">
                  {reminder.message} - {new Date(reminder.time).toLocaleString()} 
                  (Task: {tasks.find((t) => t.id === reminder.taskId)?.name || 'N/A'})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

NotificationsAndReminders.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
    })
  ),
  onReminderSet: PropTypes.func,
};

export default NotificationsAndReminders;