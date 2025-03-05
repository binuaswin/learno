import PropTypes from 'prop-types';

const LearningPerformanceAnalytics = ({
  progressData = { completion: 0, speed: 'Average' },
  insights = [],
  timeSpent = [],
}) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Learning Performance Analytics
      </h2>

      {/* Progress Tracker */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Progress Tracker
        </h3>
        <div className="mt-2">
          <p className="text-gray-600 dark:text-gray-300">
            Overall Completion: {progressData.completion}%
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progressData.completion}%` }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Learning Speed: {progressData.speed}
          </p>
          {/* Placeholder for Chart */}
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              [Chart Placeholder: Progress Over Time]
            </p>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Performance Insights
        </h3>
        {insights.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {insights.map((insight, index) => (
              <li
                key={index}
                className="text-gray-600 dark:text-gray-300"
              >
                {insight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No performance insights available yet.
          </p>
        )}
      </div>

      {/* Time Spent Analysis */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Time Spent Analysis
        </h3>
        {timeSpent.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {timeSpent.map((item, index) => (
              <li
                key={index}
                className="text-gray-600 dark:text-gray-300"
              >
                {item.task}: {item.hours} hours
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No time spent data available yet.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
LearningPerformanceAnalytics.propTypes = {
  progressData: PropTypes.shape({
    completion: PropTypes.number,
    speed: PropTypes.string,
  }),
  insights: PropTypes.arrayOf(PropTypes.string),
  timeSpent: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired,
    })
  ),
};

export default LearningPerformanceAnalytics;