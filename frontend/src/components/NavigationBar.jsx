import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavigationBar.css";
import Notification from "./Notification"; // Import Notification component

const NavigationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true); // Flag to indicate new notifications

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setHasNewNotifications(false); // Clear the new notifications flag when opened
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Learno</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/progress">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        
        {/* Bell Icon for Notifications */}
        <li className="notification-icon" onClick={toggleNotifications}>
          <span role="img" aria-label="bell">🔔</span>
          {hasNewNotifications && <span className="notification-dot"></span>} {/* Red Dot */}
        </li>
      </ul>

      {/* Show Notification Dropdown */}
      {showNotifications && (
        <div className="notification-dropdown">
          <Notification />
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
