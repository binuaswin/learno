import PropTypes from 'prop-types';

const LearningMilestones = ({
  achievements = [],
  streak = 0,
  completionBadges = [],
}) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Learning Milestones
      </h2>

      {/* Achievements and Badges */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Achievements and Badges
        </h3>
        {achievements.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No achievements earned yet.
          </p>
        )}
      </div>

      {/* Learning Streaks */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Learning Streaks
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {streak > 0
            ? `🔥 You’ve maintained a ${streak}-day learning streak! Keep it up!`
            : 'Start learning consistently to build a streak!'}
        </p>
      </div>

      {/* Completion Badges */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Completion Badges
        </h3>
        {completionBadges.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {completionBadges.map((badge, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-3"
              >
                <span className="text-2xl">🎖️</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {badge.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Earned for {badge.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No completion badges earned yet.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
LearningMilestones.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  streak: PropTypes.number,
  completionBadges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
    })
  ),
};

export default LearningMilestones;
