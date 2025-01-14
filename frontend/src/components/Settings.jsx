import React, { useContext } from "react";
import "./Settings.css";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-option">
        <span>Dark Mode</span>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
      <div className="settings-option">
        <label htmlFor="notifications">Notifications</label>
        <select id="notifications" className="settings-dropdown">
          <option value="all">All Notifications</option>
          <option value="important">Only Important</option>
          <option value="none">Disable Notifications</option>
        </select>
      </div>
      <div className="settings-option">
        <label htmlFor="language">Language</label>
        <select id="language" className="settings-dropdown">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
