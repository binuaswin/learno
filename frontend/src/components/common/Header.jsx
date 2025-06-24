import { BookOpen, ClipboardList, Calendar, User, LogOut, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/Authcontext';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileClick = (e) => {
    e.preventDefault();
    console.debug(`[${new Date().toISOString()}] Header - Profile clicked, user:`, user?._id);
    navigate(user ? '/profile' : '/login');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.debug(`[${new Date().toISOString()}] Header - Logout initiated, user:`, user?._id);
    try {
      if (typeof logout !== 'function') {
        throw new Error('Logout function not available.');
      }
      logout(navigate);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Header - Logout error:`, error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.debug(`[${new Date().toISOString()}] Header - Search query:`, searchQuery);
      // Placeholder: Implement search redirect or API call
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (authLoading) {
    return (
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Learno</h1>
        <div className="text-gray-600 text-sm">Loading...</div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Learno</h1>
      <div className="flex items-center space-x-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md pl-10 pr-4 text-gray-700 w-48 text-sm"
            id="searchInput"
            name="searchInput"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </form>
        <BookOpen
          className="text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => navigate('/adaptivelearn')}
          title="Adaptive Learning"
          size={20}
        />
        <ClipboardList
          className="text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => navigate('/studyplanner')}
          title="Study Planner"
          size={20}
        />
        <Calendar
          className="text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => navigate('/skilldev')}
          title="Skill Development"
          size={20}
        />
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer flex items-center justify-center"
          onClick={handleProfileClick}
          title="Profile"
          aria-label="Profile"
        >
          {user?.profileImage ? (
            <img
              src={`/Uploads${user.profileImage.startsWith('/') ? user.profileImage : `/${user.profileImage}`}?t=${Date.now()}`}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.debug(`[${new Date().toISOString()}] Header - Profile image failed:`, user.profileImage);
                e.target.replaceWith(
                  <User className="text-gray-500" size={20} />
                );
              }}
            />
          ) : (
            <User className="text-gray-500" size={20} />
          )}
        </div>
        {user ? (
          <>
            <span className="text-gray-700 text-sm font-medium">
              {user.name || user.email || 'User'}
            </span>
            <LogOut
              className="text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={handleLogout}
              title="Logout"
              size={20}
            />
          </>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-gray-800 text-sm">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;