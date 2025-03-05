import PropTypes from 'prop-types';

const PersonalizedRemindersAndNotifications = ({
  taskReminders = [],
  activityAlerts = [],
  motivationalMessages = [],
}) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Personalized Reminders and Notifications
      </h2>

      {/* Task Reminders */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Task Reminders
        </h3>
        {taskReminders.length > 0 ? (
          <ul className="mt-2 space-y-3">
            {taskReminders.map((reminder, index) => (
              <li
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl text-red-500">⏰</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {reminder.task}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {reminder.dueDate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No task reminders at the moment.
          </p>
        )}
      </div>

      {/* Activity Alerts */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Activity Alerts
        </h3>
        {activityAlerts.length > 0 ? (
          <ul className="mt-2 space-y-3">
            {activityAlerts.map((alert, index) => (
              <li
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl text-blue-500">🔔</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {alert.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {alert.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No new activity alerts.
          </p>
        )}
      </div>

      {/* Motivational Messages */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Motivational Messages
        </h3>
        {motivationalMessages.length > 0 ? (
          <ul className="mt-2 space-y-3">
            {motivationalMessages.map((message, index) => (
              <li
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl text-green-500">✨</span>
                <p className="text-gray-600 dark:text-gray-300">{message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Keep going—you’ll get a motivational boost soon!
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
PersonalizedRemindersAndNotifications.propTypes = {
  taskReminders: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ),
  activityAlerts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  motivationalMessages: PropTypes.arrayOf(PropTypes.string),
};

export default PersonalizedRemindersAndNotifications;