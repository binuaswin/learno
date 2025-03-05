import PropTypes from 'prop-types';

const PersonalizedLearningPath = ({
  progress = 0,
  skills = [],
  nextSteps = [],
  challenges = [],
}) => {
  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Personalized Learning Path
      </h2>

      {/* Current Progress */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Current Progress
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          You have completed {progress}% of your learning path.
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Skill Assessment */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Skill Assessment
        </h3>
        {skills.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="text-gray-600 dark:text-gray-300"
              >
                {skill.name}: {skill.level}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No skill assessments available yet.
          </p>
        )}
      </div>

      {/* Adaptive Pathway */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Next Steps
        </h3>
        {nextSteps.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {nextSteps.map((step, index) => (
              <li
                key={index}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <span className="font-medium">{step.title}</span> - {step.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No next steps available yet.
          </p>
        )}
      </div>

      {/* Challenges/Areas of Improvement */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Challenges & Areas of Improvement
        </h3>
        {challenges.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {challenges.map((challenge, index) => (
              <li
                key={index}
                className="text-gray-600 dark:text-gray-300"
              >
                {challenge}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No challenges identified yet.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
PersonalizedLearningPath.propTypes = {
  progress: PropTypes.number,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
    })
  ),
  nextSteps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  challenges: PropTypes.arrayOf(PropTypes.string),
};

export default PersonalizedLearningPath;