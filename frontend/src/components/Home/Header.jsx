import { Bell, User, Search, BookOpen, ClipboardList, Calendar, TrendingUp } from "lucide-react";

const Header = () => {
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
        <User className="text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
