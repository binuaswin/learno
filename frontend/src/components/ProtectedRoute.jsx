import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = (props) => {
    const{children} =props
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  if (!token) {
    navigate("/"); // Redirect to login if no token found
    return null; // Return null while redirecting
  }

  return <>{children}</>; // Render children if user is authenticated
};
ProtectedRoute.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };
export default ProtectedRoute;
