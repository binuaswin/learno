import { Link } from "react-router-dom";
import { useAuth } from "../auth/Authcontext"; // Adjust the import path as necessary

const Navbar = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    console.log("Logout initiated, user before logout:", user);
    logout();
    console.log("Logout called, user after logout:", user);
  };

  console.log("Navbar rendering, current user state:", user); // Debug

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white font-bold text-xl">
          Learno
        </Link>
        {user && (
          <div className="space-x-4">
            <Link to="/dashboard" className="text-white">
              Da
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
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/settings" className="text-white">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;