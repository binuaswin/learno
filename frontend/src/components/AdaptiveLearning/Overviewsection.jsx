import PropTypes from 'prop-types';

const OverviewSection = ({ userName = 'User', learningGoal = 'a new skill' }) => {
  return (
    <section className="mb-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {userName ? `Your Personalized Learning Path` : 'Adaptive Learning'}
      </h1>

      {/* Introduction Text */}
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Adaptive learning tailors your experience based on your progress, preferences, and strengths, ensuring a personalized journey to mastery.
      </p>

      {/* Learning Goals */}
      <p className="text-gray-600 dark:text-gray-300 mt-1">
        Current Goal: Master {learningGoal}.
      </p>
    </section>
  );
};

// PropTypes validation
OverviewSection.propTypes = {
  userName: PropTypes.string,
  learningGoal: PropTypes.string,
};

export default OverviewSection;