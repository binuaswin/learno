//frontend/src/components/dashboard/ActivityLogSection.jsx
import PropTypes from 'prop-types';

const ActivityLogSection = ({ activities, loading, error }) => {
  if (loading) {
    return (
      <div className="activity-log-section" role="status">
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="activity-log-section" role="alert">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(activities) || activities === undefined) {
    console.error('Expected an array for "activities" prop, received:', activities);
    return (
      <div className="activity-log-section" role="alert">
        <p className="text-red-500">Error: Invalid data for activities</p>
      </div>
    );
  }

  return (
    <section className="activity-log-section bg-white p-4 rounded-md shadow-md" aria-labelledby="activity-log-heading">
      <h4 id="activity-log-heading" className="text-lg font-semibold">Recent Activities</h4>
      {activities.length === 0 ? (
        <p>No recent activities found.</p>
      ) : (
        <ul className="list-none" role="list">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="activity-item flex justify-between items-center p-2"
              role="listitem"
            >
              <span className="activity-action">
                {activity.icon} {activity.description}
              </span>
              <span className="activity-time">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

ActivityLogSection.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string.isRequired,
      timestamp: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

ActivityLogSection.defaultProps = {
  loading: false,
  error: null,
};

export default ActivityLogSection;

