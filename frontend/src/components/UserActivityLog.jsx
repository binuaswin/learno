
import PropTypes from "prop-types";

const UserActivityLog = ({ user }) => {
  // Mock data (replace with user prop or backend data)
  const activities = user?.activities || [
    { id: 1, type: "task", title: "Completed React Module", date: "2025-04-07", timeSpent: 120 },
    { id: 2, type: "learning", title: "JavaScript Session", date: "2025-04-06", timeSpent: 90 },
    { id: 3, type: "achievement", title: "Earned React Badge", date: "2025-04-05", timeSpent: 0 },
    { id: 4, type: "task", title: "Submitted Assignment 1", date: "2025-04-04", timeSpent: 60 },
  ];

  // Calculate learning insights
  const totalTimeSpent = activities.reduce((sum, act) => sum + act.timeSpent, 0);
  const avgTimeSpent = activities.length > 0 ? (totalTimeSpent / activities.length).toFixed(1) : 0;
  const mostActiveHour = activities.reduce((maxHour, act) => {
    const hour = new Date(act.date + "T12:00:00").getHours(); // Mock hour for simplicity
    return (act.timeSpent > (maxHour.time || 0)) ? { hour, time: act.timeSpent } : maxHour;
  }, {}).hour || "N/A";
  const tasksCompleted = activities.filter((act) => act.type === "task" && act.title.includes("Completed")).length;
  const weeks = Math.ceil(activities.length / 7); // Rough weekly average
  const tasksPerWeek = weeks > 0 ? (tasksCompleted / weeks).toFixed(1) : 0;

  return (
    <div className="user-activity-log bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">User Activity Log</h3>

      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-2">Recent Activity</h4>
        {activities.length > 0 ? (
          <ul className="space-y-4">
            {activities
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5) // Show last 5 activities
              .map((activity) => (
                <li key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{activity.title}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(activity.date).toLocaleDateString()} {activity.timeSpent > 0 && `(${activity.timeSpent} min)`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Type: {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No recent activities.</p>
        )}
      </div>

      {/* Learning Insights */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Learning Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{avgTimeSpent} min</p>
            <p className="text-sm text-gray-600">Avg Time Spent</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">{mostActiveHour}:00</p>
            <p className="text-sm text-gray-600">Most Active Hour</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-600">{tasksPerWeek}</p>
            <p className="text-sm text-gray-600">Tasks/Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserActivityLog.propTypes = {
  user: PropTypes.shape({
    activities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.oneOf(["task", "learning", "achievement"]),
      title: PropTypes.string,
      date: PropTypes.string,
      timeSpent: PropTypes.number,
    })),
  }),
};

UserActivityLog.defaultProps = {
  user: {},
};

export default UserActivityLog;