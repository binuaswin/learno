import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CheckCircle, Trash } from "lucide-react";
const notificationsData = [
  { id: 1, message: "You have a new task due tomorrow!", read: false },
  { id: 2, message: "New skill recommendation available!", read: false },
  { id: 3, message: "Your study streak is now 7 days!", read: true },
];

const NotificationDropdown = ({ isOpen, onMarkAllAsRead }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await new Promise((resolve) =>
        setTimeout(() => resolve(notificationsData), 500)
      );
      setNotifications(data);
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }, 300);
    return () => clearTimeout(timer);
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
        <p className="text-sm text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div
      className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4"
      role="menu"
      aria-live={isOpen ? "polite" : "off"}
      aria-hidden={!isOpen}
    >
      <h3 className="font-semibold text-gray-700" role="heading">
        Notifications
      </h3>
      {notifications.length > 0 ? (
        <ul className="mt-2">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`flex items-center justify-between p-2 rounded ${notif.read ? "bg-gray-100" : "bg-blue-50 hover:bg-blue-100"}`}
            >
              <span className="text-sm text-gray-800">{notif.message}</span>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="ml-2 text-green-500 hover:text-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No new notifications</p>
      )}
      {notifications.length > 0 && (
        <>
          <button
            onClick={() => {
              setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, read: true }))
              );
              onMarkAllAsRead();
            }}
            className="w-full mt-3 p-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center"
          >
            Mark All as Read
          </button>
          <button
            onClick={clearNotifications}
            className="w-full mt-3 p-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center"
          >
            <Trash className="w-4 h-4 mr-1" /> Clear All
          </button>
        </>
      )}
    </div>
  );
};

NotificationDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onMarkAllAsRead: PropTypes.func,
};

NotificationDropdown.defaultProps = {
  isOpen: false,
  onMarkAllAsRead: () => {},
};

export default NotificationDropdown;
