import { Bell, Search, BookOpen, ClipboardList, Calendar, TrendingUp, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import { useProfile } from "./Home/useProfile";
import { useState } from "react";
import NotificationDropdown from "./Home/notification/NotificationDropdown";
import { useAuth } from "./authUtils";

const Header = () => {
  const navigate = useNavigate();
  const { profileImage, loading, error } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    console.log("Profile clicked");
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    console.log("Logout initiated, user before logout:", user);
    if (typeof logout !== "function") {
      throw new Error("Logout function is not available in useAuth. Ensure AuthProvider is set up correctly.");
    }
    logout(() => {
      console.log("Logout callback, user after logout:", user);
      setTimeout(() => {
        console.log("Forcing navigation to / after logout, user:", user);
        navigate("/");
      }, 0);
    });
  };

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
          onClick={() => navigate("/adaptivelearn")}
          title="Adaptive Learning"
          size={18}
        />
        <ClipboardList
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate("/studyplanner")}
          title="Study Planner"
          size={18}
        />
        <Calendar
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate("/studyplanner")}
          title="Calendar"
          size={18}
        />
        <TrendingUp
          className="text-gray-600 cursor-pointer"
          onClick={() => navigate("/skilldev")}
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
          <NotificationDropdown isOpen={isDropdownOpen} closeDropdown={closeDropdown} />
        </div>
        <div
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-md cursor-pointer"
          onClick={handleProfileClick}
          title="Profile"
          aria-label="Profile"
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              Loading...
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              {error}
            </div>
          ) : profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>
        {user ? (
          <LogOut
            className="text-gray-600 cursor-pointer"
            onClick={handleLogout}
            title="Logout"
            size={18}
          />
        ) : (
          <Link to="/login" className="text-gray-600">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;