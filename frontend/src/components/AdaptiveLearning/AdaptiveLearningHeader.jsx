import "./AdaptiveLearningHeader.css";
import PropTypes from "prop-types";

const AdaptiveLearningHeader = ({ userName ,progress }) => {
  return (
    <header className="adaptive-header">
      <h1>Welcome to Adaptive Learning, {userName}!</h1>
      <p>
        Take control of your learning journey with personalized modules and
        progress tracking.
      </p>
      <div className="progress-overview">
        <h3>Your Overall Progress</h3>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
            title={`${progress}% Complete`}
          >
            {progress}%
          </div>
        </div>
      </div>
    </header>
  );
};
AdaptiveLearningHeader.propTypes = {
    userName: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  };

export default AdaptiveLearningHeader;
