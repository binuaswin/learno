// frontend/src/components/Home/notification/NotificationDropdown.jsx
import PropTypes from 'prop-types';

const NotificationDropdown = ({ closeDropdown = () => {} }) => {
  const notifications = [
    { id: 1, message: 'You have a new message!', time: '5 mins ago' },
    { id: 2, message: 'Your study plan is ready.', time: '10 mins ago' },
  ];

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-2 bg-gray-100 rounded-md">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No new notifications</p>
        )}
        <button
          onClick={closeDropdown}
          className="mt-4 w-full text-center text-sm text-blue-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

NotificationDropdown.propTypes = {
  closeDropdown: PropTypes.func, // Remove isRequired since we have a default value
};

export default NotificationDropdown;