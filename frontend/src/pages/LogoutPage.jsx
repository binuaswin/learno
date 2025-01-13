import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user authentication data, e.g., from localStorage
    localStorage.removeItem("userToken");  // Or sessionStorage.clear() if you use sessionStorage

    // You can also reset any global states here if needed (like Redux or context API)
    // Dispatch log out action in global state if needed

    // Redirect to Login page
    navigate("/");
  };

  return (
    <div className="logout-page">
      <h1>You have been logged out!</h1>
      <p>We hope to see you again soon.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;
