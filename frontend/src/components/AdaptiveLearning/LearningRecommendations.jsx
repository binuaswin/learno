import PropTypes from 'prop-types';

const LearningRecommendations = ({
  suggestedModules = [],
  skillImprovements = [],
  difficultyLevel = 'Medium',
  quizPerformance = null,
}) => {
  // Adjust recommendations based on quiz performance (mock real-time adaptation)
  const adjustedModules = quizPerformance
    ? quizPerformance >= 70
      ? [...suggestedModules, { title: 'Advanced Challenge', difficulty: 'Hard' }]
      : [...suggestedModules, { title: 'Review Basics', difficulty: 'Easy' }]
    : suggestedModules;

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Learning Recommendations
      </h2>

      {/* Suggested Modules */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Suggested Modules
        </h3>
        {adjustedModules.length > 0 ? (
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {adjustedModules.map((module, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {module.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Difficulty: {module.difficulty}
                </p>
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Start Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No modules suggested yet.
          </p>
        )}
      </div>

      {/* Skill Improvement Suggestions */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Skill Improvement Suggestions
        </h3>
        {skillImprovements.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {skillImprovements.map((skill, index) => (
              <li
                key={index}
                className="text-gray-600 dark:text-gray-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No skill improvements suggested yet.
          </p>
        )}
      </div>

      {/* Difficulty Adjustment */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Difficulty Adjustment
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Based on your performance, we recommend{' '}
          <span className="font-medium">
            {difficultyLevel === 'Easy'
              ? 'beginner-level content'
              : difficultyLevel === 'Hard'
              ? 'more challenging tasks'
              : 'intermediate content'}
          </span>{' '}
          to suit your current level.
        </p>
      </div>

      {/* Real-time Adaptation */}
      {quizPerformance !== null && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Real-time Adaptation
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Based on your recent quiz score of {quizPerformance}%, we’ve adjusted your recommendations{' '}
            {quizPerformance >= 70 ? 'to include advanced topics.' : 'to reinforce the basics.'}
          </p>
        </div>
      )}
    </section>
  );
};

// PropTypes validation
LearningRecommendations.propTypes = {
  suggestedModules: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
    })
  ),
  skillImprovements: PropTypes.arrayOf(PropTypes.string),
  difficultyLevel: PropTypes.oneOf(['Easy', 'Medium', 'Hard']),
  quizPerformance: PropTypes.number, // Nullable for real-time adaptation
};

export default LearningRecommendations;