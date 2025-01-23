import "./RecentActivity.css";
import PropTypes from "prop-types";

const RecentActivity = ({ activities }) => {
  return (
    <div className="recent-activity">
      <h2 className="section-title">Recent Activity</h2>
      {activities && activities.length > 0 ? (
        <ul className="activity-list">
          {activities.map((activity, index) => (
            <li key={index} className="activity-item">
              <span className="activity-icon">{activity.icon}</span>
              <div className="activity-details">
                <p className="activity-description">{activity.description}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-activity">No recent activity available.</p>
      )}
    </div>
  );
};
RecentActivity.propTypes = {
  name: PropTypes.string.isRequired,
  activities: PropTypes.node.isRequired,
};


export default RecentActivity;
