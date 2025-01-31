import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { Home, Book, CheckCircle, Users, Calendar, BarChart, Bell, Settings, HelpCircle, ClipboardList } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h bg-gray-900 text-white ${isOpen ? "w-70" : "w-24"} transition-all duration-300 p-4`}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-4 focus:outline-none color-red">
        {isOpen ? "☰ Close" : "☰ Open"}
      </button>
      <nav className="space-y-4">
        <NavItem to="/dashboard" icon={<Home size={24} />} label="Dashboard" isOpen={isOpen} />
        <NavItem to="/study-planner" icon={<Book size={24} />} label="Study Planner" isOpen={isOpen} />
        <NavItem to="/skill-development" icon={<CheckCircle size={24} />} label="Skill Development" isOpen={isOpen} />
        <NavItem to="/adaptive-learning" icon={<Users size={24} />} label="Adaptive Learning" isOpen={isOpen} />
        <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" isOpen={isOpen} />
        <NavItem to="/analytics" icon={<BarChart size={24} />} label="Analytics" isOpen={isOpen} />
        <NavItem to="/notifications" icon={<Bell size={24} />} label="Notifications" isOpen={isOpen} />
        <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" isOpen={isOpen} />
        <NavItem to="/help" icon={<HelpCircle size={24} />} label="Help" isOpen={isOpen} />
        <NavItem to="/progress" icon={<ClipboardList size={24} />} label="Progress" isOpen={isOpen} />
      </nav>
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
  to: PropTypes.string.isRequired, // Ensures 'to' is a required string
  icon: PropTypes.element.isRequired, // Ensures 'icon' is a required React element
  label: PropTypes.string.isRequired, // Ensures 'label' is a required string
  isOpen: PropTypes.bool.isRequired, // Ensures 'isOpen' is a required boolean
};

export default Sidebar;
