import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
import { useTheme } from './ThemeContext';
import { FaMoon, FaSun ,FaCog } from 'react-icons/fa';
import "./NavigationBar.css";
import Notification from "./Notification"; // Import Notification component


const NavigationBar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const { theme,toggleTheme } = useTheme(); 
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
       
        <li className="navbar-dropdown">
          <div
            className="navbar-icon"
            onClick={toggleDropdown}
            role="button"
            aria-label="Settings"
          >
            <FaCog />
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/settings">Settings</Link>
              <button onClick={() => alert("Dark Mode toggled!")}>Dark Mode</button>
              <button onClick={() => navigate("/logout")}>Logout</button>
            </div>
          )}
        </li>
      </ul>

      {/* Show Notification Dropdown */}
      {showNotifications && (
        <div className="notification-dropdown">
          <Notification />
        </div>
      )}
       <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Toggle icons based on theme */}
      </button>
    </nav>
  );
};

export default NavigationBar;
