import { useState } from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  onTimeZoneChange = () => {},
  onNotificationSettingsChange = () => {},
  initialTimeZone = 'UTC',
  initialNotificationSettings = {
    upcomingTasks: true,
    deadlines: true,
    reminders: true,
    method: 'in-app', // 'in-app', 'email', 'push'
  },
}) => {
  const [timeZone, setTimeZone] = useState(initialTimeZone);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);

  // Sample time zones (simplified list; use a library like `moment-timezone` for a full list)
  const timeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  // Notification methods
  const notificationMethods = ['in-app', 'email', 'push'];

  // Handle time zone change
  const handleTimeZoneChange = (e) => {
    const newTimeZone = e.target.value;
    setTimeZone(newTimeZone);
    onTimeZoneChange(newTimeZone);
  };

  // Handle notification settings change
  const handleNotificationChange = (key, value) => {
    const updatedSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(updatedSettings);
    onNotificationSettingsChange(updatedSettings);
  };

  return (
    <div className="settings">
      <h3>Settings</h3>

      {/* Time Zone Settings */}
      <div className="settings-section">
        <h4>Time Zone</h4>
        <select
          value={timeZone}
          onChange={handleTimeZoneChange}
          className="timezone-select"
        >
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
        <p>Current Time Zone: {timeZone}</p>
      </div>

      {/* Task Notification Settings */}
      <div className="settings-section">
        <h4>Task Notifications</h4>
        <div className="notification-options">
          <label className="notification-option">
            <input
              type="checkbox"
              checked={notificationSettings.upcomingTasks}
              onChange={(e) =>
                handleNotificationChange('upcomingTasks', e.target.checked)
              }
            />
            Upcoming Tasks
          </label>
          <label className="notification-option">
            <input
              type="checkbox"
              checked={notificationSettings.deadlines}
              onChange={(e) =>
                handleNotificationChange('deadlines', e.target.checked)
              }
            />
            Deadlines
          </label>
          <label className="notification-option">
            <input
              type="checkbox"
              checked={notificationSettings.reminders}
              onChange={(e) =>
                handleNotificationChange('reminders', e.target.checked)
              }
            />
            Reminders
          </label>
          <select
            value={notificationSettings.method}
            onChange={(e) => handleNotificationChange('method', e.target.value)}
            className="method-select"
          >
            {notificationMethods.map((method) => (
              <option key={method} value={method}>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <p>
          Notifications: {Object.entries(notificationSettings)
            .filter(([key]) => key !== 'method')
            .map(([key, value]) => (value ? key : '')).filter(Boolean).join(', ') || 'None'} 
          {' '}via {notificationSettings.method}
        </p>
      </div>
    </div>
  );
};

Settings.propTypes = {
  onTimeZoneChange: PropTypes.func,
  onNotificationSettingsChange: PropTypes.func,
  initialTimeZone: PropTypes.string,
  initialNotificationSettings: PropTypes.shape({
    upcomingTasks: PropTypes.bool,
    deadlines: PropTypes.bool,
    reminders: PropTypes.bool,
    method: PropTypes.oneOf(['in-app', 'email', 'push']),
  }),
};

export default Settings;