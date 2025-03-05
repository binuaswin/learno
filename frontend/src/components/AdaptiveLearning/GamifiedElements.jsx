import PropTypes from 'prop-types';

const GamifiedElements = ({
  milestones = [],
  leaderboard = [],
  rewards = [],
}) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Gamified Elements
      </h2>

      {/* Progress Milestones */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Progress Milestones
        </h3>
        {milestones.length > 0 ? (
          <div className="mt-2 space-y-3">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {milestone.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {milestone.description}{' '}
                    {milestone.achieved ? '(Achieved)' : '(In Progress)'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No milestones set yet.
          </p>
        )}
      </div>

      {/* Leaderboards/Challenges */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Leaderboard
        </h3>
        {leaderboard.length > 0 ? (
          <div className="mt-2">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Rank</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">User</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={index} className="border-t dark:border-gray-700">
                    <td className="p-3 text-gray-600 dark:text-gray-300">{index + 1}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{entry.user}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No leaderboard data available yet.
          </p>
        )}
      </div>

      {/* Rewards */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Rewards
        </h3>
        {rewards.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {reward.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {reward.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No rewards earned yet.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
GamifiedElements.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      achieved: PropTypes.bool.isRequired,
    })
  ),
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ),
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default GamifiedElements;