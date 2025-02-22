import { Bell, Search, BookOpen, ClipboardList, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./ProfileContext";
const Header = () => {
const navigate=useNavigate();
const { profileImage } = useProfile();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Learno</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md pl-10 text-gray-700"
          />
          <Search className="absolute right-3 top-3 text-gray-500" size={18} />
        </div>
        <BookOpen className="text-gray-600 cursor-pointer" />
        <ClipboardList className="text-gray-600 cursor-pointer" />
        <Calendar className="text-gray-600 cursor-pointer" />
        <TrendingUp className="text-gray-600 cursor-pointer" />
        <Bell className="text-gray-600 cursor-pointer" />
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-md cursor-pointer"onClick={()=>navigate('/profile')}>
        {profileImage ? (
          <img src={profileImage} alt="Profile"   className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
        </div>      </div>
    </header>
  );
};

export default Header;
