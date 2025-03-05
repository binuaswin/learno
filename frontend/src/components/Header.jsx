import { Bell, Search, BookOpen, ClipboardList, Calendar, TrendingUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./Home/useProfile";
import { useState } from "react";
import NotificationDropdown from "./Home/notification/NotificationDropdown";
import { useAuth } from "./authUtils"; // Import useAuth for user checking
import Cookies from "js-cookie"; // Import Cookies for logout

const Header = () => {
  const navigate = useNavigate();
  const { profileImage, loading, error } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth(); // Add useAuth to check user state

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    console.log("Profile clicked");
    if (user) {
      navigate("/profile"); // Navigate to profile page only if user is authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    console.log("Logout clicked");
    Cookies.remove("token"); // Use Cookies instead of localStorage
    Cookies.remove("refreshToken"); // Ensure refresh token is also removed
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Learno</h1>
      <div className="flex items-center space-x-8"> {/* Increased spacing to prevent overlap */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md pl-10 text-gray-700"
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
              {error} {/* Show specific error for debugging */}
            </div>
          ) : profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>
        <LogOut
          className="text-gray-600 cursor-pointer"
          onClick={handleLogout}
          title="Logout"
          size={18}
        />
      </div>
    </header>
  );
};

export default Header;