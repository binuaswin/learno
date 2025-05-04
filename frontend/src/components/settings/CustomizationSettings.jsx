import  { useState } from 'react';
import PropTypes from 'prop-types';

const CustomizationSettings = ({ onSave }) => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    onSave({ theme, notifications });
  };

  return (
    <div className="customization-settings">
      <h3>Customization Settings</h3>
      <label>
        Theme:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

CustomizationSettings.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CustomizationSettings;
