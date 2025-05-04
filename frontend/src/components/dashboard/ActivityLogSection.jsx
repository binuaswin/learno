import PropTypes from 'prop-types';
import "./Activity.css";

const ActivityLogSection = ({ activities }) => {
  // Check if the activities prop is not an array or is empty
  if (!Array.isArray(activities)) {
    console.error('Expected an array for "activities" prop.');
    return <p>Error: Invalid data for activities</p>;
  }

  return (
    <div className="activity-log-section">
      <h4>Recent Activities</h4>
      {activities.length === 0 ? (
        <p>No recent activities found.</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={index} className="activity-item">
              <span className="activity-action">{activity.action}</span>
              <span className="activity-time">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ActivityLogSection.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ActivityLogSection;
