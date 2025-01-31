import PropTypes from "prop-types"; // Import PropTypes

export const Card = ({ children, className }) => {
  return <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>;
};

// Add PropTypes validation for Card component
Card.propTypes = {
  children: PropTypes.node.isRequired,  // Ensure 'children' is a required prop and can be any renderable content
  className: PropTypes.string  // Ensure 'className' is a string
};

export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// Add PropTypes validation for CardContent component
CardContent.propTypes = {
  children: PropTypes.node.isRequired,  // Ensure 'children' is a required prop and can be any renderable content
  className: PropTypes.string  // Ensure 'className' is a string
};

export default Card;