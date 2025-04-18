import  { useState } from "react";
import PropTypes from "prop-types";

const SettingsAndPreferences = ({ user, onUpdateSettings }) => {
  // Initial settings data (can be overridden by user prop or backend)
  const initialSettings = user?.settings || {
    email: user?.email || "",
    password: "",
    notifications: { email: true, push: false },
    language: "English",
    privacy: { profileVisibility: "public", activityVisibility: "friends" },
    theme: "light",
  };
  const [settings, setSettings] = useState(initialSettings);
  const [error, setError] = useState("");

  // Handle settings updates
  const handleUpdate = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    if (onUpdateSettings) onUpdateSettings({ ...settings, [field]: value });
  };

  // Handle nested object updates (e.g., notifications, privacy)
  const handleNestedUpdate = (parentField, childField, value) => {
    setSettings((prev) => ({
      ...prev,
      [parentField]: { ...prev[parentField], [childField]: value },
    }));
    if (onUpdateSettings)
      onUpdateSettings({
        ...settings,
        [parentField]: { ...settings[parentField], [childField]: value },
      });
  };

  // Handle password change (mocked, replace with backend call)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (settings.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    alert("Password updated successfully! (Mocked)"); // Replace with API call
    setSettings((prev) => ({ ...prev, password: "" }));
    if (onUpdateSettings) onUpdateSettings(settings);
  };

  // Languages options
  const languages = ["English", "Spanish", "French", "German"];

  return (
    <div className="settings-and-preferences bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings & Preferences</h3>

      {/* Account Settings */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Account Settings</h4>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleUpdate("email", e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={settings.password}
            onChange={(e) => handleUpdate("password", e.target.value)}
            placeholder="New Password"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Change Password
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Notification Preferences</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleNestedUpdate("notifications", "email", e.target.checked)}
              className="mr-2"
            />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => handleNestedUpdate("notifications", "push", e.target.checked)}
              className="mr-2"
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Language Settings */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Language Settings</h4>
        <select
          value={settings.language}
          onChange={(e) => handleUpdate("language", e.target.value)}
          className="w-full p-2 border rounded"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Privacy Settings</h4>
        <div className="space-y-2">
          <label className="block">
            Profile Visibility:
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleNestedUpdate("privacy", "profileVisibility", e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </label>
          <label className="block">
            Activity Visibility:
            <select
              value={settings.privacy.activityVisibility}
              onChange={(e) => handleNestedUpdate("privacy", "activityVisibility", e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
      </div>

      {/* Theme Settings */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Theme Settings</h4>
        <div className="space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="light"
              checked={settings.theme === "light"}
              onChange={(e) => handleUpdate("theme", e.target.value)}
              className="mr-2"
            />
            Light Mode
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="dark"
              checked={settings.theme === "dark"}
              onChange={(e) => handleUpdate("theme", e.target.value)}
              className="mr-2"
            />
            Dark Mode
          </label>
        </div>
      </div>
    </div>
  );
};

SettingsAndPreferences.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    settings: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      notifications: PropTypes.shape({
        email: PropTypes.bool,
        push: PropTypes.bool,
      }),
      language: PropTypes.string,
      privacy: PropTypes.shape({
        profileVisibility: PropTypes.oneOf(["public", "friends", "private"]),
        activityVisibility: PropTypes.oneOf(["public", "friends", "private"]),
      }),
      theme: PropTypes.oneOf(["light", "dark"]),
    }),
  }),
  onUpdateSettings: PropTypes.func,
};

SettingsAndPreferences.defaultProps = {
  user: {},
  onUpdateSettings: () => {},
};

export default SettingsAndPreferences;