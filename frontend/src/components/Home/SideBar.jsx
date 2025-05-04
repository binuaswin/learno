import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../auth/Authcontext';
import {
  Home,
  Book,
  CheckCircle,
  Users,
  Calendar,
  BarChart,
  Bell,
  Settings,
  ClipboardList,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';


const SideBar = ({ notifications = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 p-4 flex flex-col justify-between`}
    >
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white mb-6 flex items-center gap-2"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          {isOpen && <span>Collapse</span>}
        </button>
        <nav className="space-y-4">
          <NavItem to="/dashboard" icon={<Home size={24} />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/studyplanner" icon={<Book size={24} />} label="Study Planner" isOpen={isOpen} />
          <NavItem to="/skilldev" icon={<CheckCircle size={24} />} label="Skill Development" isOpen={isOpen} />
          <NavItem to="/adaptivelearn" icon={<Users size={24} />} label="Adaptive Learning" isOpen={isOpen} />
          <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" isOpen={isOpen} />
          <NavItem to="/analytics" icon={<BarChart size={24} />} label="Analytics" isOpen={isOpen} />
          <NavItem to="/profile" icon={<User size={24} />} label="Profile" isOpen={isOpen} />
          <NavItem to="/progress" icon={<ClipboardList size={24} />} label="Progress" isOpen={isOpen} />
          <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" isOpen={isOpen} />
        </nav>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="relative cursor-pointer" onClick={handleNotificationClick}>
          <Bell size={24} className="text-white hover:text-yellow-400 transition" />
          {isNotificationOpen && <NotificationDropdown notifications={notifications} />}
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isOpen }) => (
  <NavLink
    to={to}
    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
    activeClassName="bg-gray-700"
  >
    {icon}
    {isOpen && <span>{label}</span>}
  </NavLink>
);

const NotificationDropdown = ({ notifications }) => (
  <div className="notification-dropdown">
    <h4 className="font-bold mb-2">Notifications</h4>
    {notifications.length > 0 ? (
      <ul>
        {notifications.map((n) => (
          <li key={n._id} className="mb-2">{n.message}</li>
        ))}
      </ul>
    ) : (
      <p>No notifications</p>
    )}
  </div>
);

SideBar.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ),
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
  ).isRequired,
};

export default SideBar;