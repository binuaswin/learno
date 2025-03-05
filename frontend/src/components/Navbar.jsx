import { Link } from "react-router-dom"; // If you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Logo and links */}
        <Link to="/" className="text-white font-bold text-xl">
          Learno
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link to="/learning-modules" className="text-white">
            Learning Modules
          </Link>
          <Link to="/study-planner" className="text-white">
            Study Planner
          </Link>
          <Link to="/profile" className="text-white">
            Profile
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Other icons like user profile or settings */}
        <Link to="/settings" className="text-white">
          Settings
        </Link>
        <Link to="/profile" className="text-white">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
