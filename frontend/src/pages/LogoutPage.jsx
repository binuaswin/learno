import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();


  
    const handleLogout = () => {
      // Clear session or token
      localStorage.removeItem("authToken"); // Example for clearing token
      sessionStorage.clear();
  
      // Redirect and replace history
      navigate("/", { replace: true });
  
      // Optional: Clear browser cache to ensure no back navigation
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
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
