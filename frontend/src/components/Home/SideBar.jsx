import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { 
  Home, Book, CheckCircle, Users, Calendar, BarChart, 
  Bell, Settings, HelpCircle, ClipboardList 
} from "lucide-react";
import NotificationDropdown from "./notification/NotificationDropdown"; // Correct path based on folder structure

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for toggling notification dropdown

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen); // Toggle notification dropdown visibility
  };

  return (
    <div className={`h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4 flex flex-col justify-between`}>
      {/* Sidebar Toggle Button */}
      <div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-4">
          {isOpen ? "☰ Close" : "☰ Open"}
        </button>
        <nav className="space-y-4">
          <NavItem to="/dashboard" icon={<Home size={24} />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/studyplanner" icon={<Book size={24} />} label="Study Planner" isOpen={isOpen} />
          <NavItem to="/skilldev" icon={<CheckCircle size={24} />} label="Skill Development" isOpen={isOpen} />
          <NavItem to="/adaptivelearn" icon={<Users size={24} />} label="Adaptive Learning" isOpen={isOpen} />
          <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" isOpen={isOpen} />
          <NavItem to="/analytics" icon={<BarChart size={24} />} label="Analytics" isOpen={isOpen} />
          <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" isOpen={isOpen} />
          <NavItem to="/help" icon={<HelpCircle size={24} />} label="Help" isOpen={isOpen} />
          <NavItem to="/progress" icon={<ClipboardList size={24} />} label="Progress" isOpen={isOpen} />
        </nav>
      </div>

      {/* Notifications & Logout Section */}
      <div className="flex flex-col space-y-3">
        {/* Bell Icon to toggle notifications */}
        <div className="relative flex items-center cursor-pointer" onClick={handleNotificationClick}>
          <Bell size={24} /> {/* Bell icon */}
          {isNotificationOpen && <NotificationDropdown />} {/* Show the NotificationDropdown when the state is true */}
        </div>
        <button className="p-2 bg-red-600 hover:bg-red-700 rounded">Logout</button>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isOpen }) => (
  <Link to={to} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition">
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

// Props validation using PropTypes
NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
