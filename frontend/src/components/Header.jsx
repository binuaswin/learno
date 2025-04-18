import { Bell, Search, BookOpen, ClipboardList, Calendar, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from './Home/useProfile';
import { useState, useEffect } from 'react';
import NotificationDropdown from './Home/notification/NotificationDropdown';
import { useAuth } from "../components/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { profileImage, loading: profileLoading, error: profileError } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, loading: authLoading } = useAuth();

  useEffect(() => {
    console.log('Header - User state updated:', user);
  }, [user]);

  console.log('Header - Rendering with user:', user, 'authLoading:', authLoading);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Profile clicked');
    console.log('User state:', user);
    if (user) {
      console.log('Navigating to /profile');
      navigate('/profile', { replace: false });
      setTimeout(() => {
        console.log('Header - Current location after navigate:', window.location.pathname);
      }, 0);
    } else {
      console.log('Navigating to /login');
      navigate('/login', { replace: false });
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    console.log('Logout initiated, user before logout:', user);
    if (typeof logout !== 'function') {
      throw new Error('Logout function is not available in useAuth. Ensure AuthProvider is set up correctly.');
    }
    logout(navigate);
  };

  if (authLoading) {
    console.log('Header - Rendering loading state');
    return <div>Loading...</div>;
  }

  console.log('Header - Rendering header content');
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Learno</h1>
      <div className="flex items-center space-x-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md pl-10 text-gray-700"
            id="searchInput"
            name="searchInput"
          />
          <Search className="absolute right-3 top-3 text-gray-500" size={18} />
        </div>
        <BookOpen
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate('/adaptivelearn')}
          title="Adaptive Learning"
          size={18}
        />
        <ClipboardList
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate('/studyplanner')}
          title="Study Planner"
          size={18}
        />
        <Calendar
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate('/studyplanner')}
          title="Calendar"
          size={18}
        />
        <TrendingUp
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate('/skilldev')}
          title="Skill Development"
          size={18}
        />
        <div className="relative">
          <Bell
            className="text-gray-600 cursor-pointer"
            onClick={toggleDropdown}
            title="Notifications"
            size={18}
          />
          {isDropdownOpen && <NotificationDropdown closeDropdown={closeDropdown} />}
        </div>
        <div className="flex items-center space-x-3">
          {user && (
            <span className="text-gray-700 text-sm font-medium">{user.name || 'User'}</span>
          )}
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-md cursor-pointer"
            onClick={handleProfileClick}
            title="Profile"
            aria-label="Profile"
          >
            {profileLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                Loading...
              </div>
            ) : profileError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                {profileError}
              </div>
            ) : profileImage ? (
              <img
                src={`http://localhost:5000${profileImage}?t=${Date.now()}`}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => console.error('Failed to load profile image')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
        {user ? (
          <LogOut
            className="text-gray-600 cursor-pointer"
            onClick={handleLogout}
            title="Logout"
            size={18}
          />
        ) : (
          <Link to="/login" className="text-gray-600">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;