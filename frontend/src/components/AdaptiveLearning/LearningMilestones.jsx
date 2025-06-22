import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const LearningMilestones = ({ achievements, streak, completionBadges }) => {
  const handleIncrementStreak = async () => {
    try {
      await taskServices.incrementStreak();
      toast.success(`Streak incremented to ${streak + 1} days!`);
    } catch (err) {
      console.error('Failed to increment streak:', err);
      toast.error(err.message || 'Failed to increment streak.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Learning Milestones</h2>

      {/* Achievements */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Achievements</h3>
        {achievements.length ? (
          <ul className="space-y-2">
            {achievements.map((achievement) => (
              <li key={achievement.title} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{achievement.title}</p>
                <p className="text-gray-600">{achievement.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No achievements earned yet.</p>
        )}
      </div>

      {/* Streak */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Learning Streak</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl text-orange-500">🔥</span>
          <p className="text-gray-600">
            {streak} {streak === 1 ? 'day' : 'days'} of continuous learning
          </p>
        </div>
        {/* Optional: Button to simulate streak increment */}
        <button
          onClick={handleIncrementStreak}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Log Today’s Learning
        </button>
      </div>

      {/* Badges */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Completion Badges</h3>
        {completionBadges.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completionBadges.map((badge) => (
              <div key={badge.name} className="p-4 bg-gray-50 rounded-md shadow-sm flex items-center space-x-4">
                <span className="text-2xl">🏅</span>
                <div>
                  <p className="font-medium text-gray-800">{badge.name}</p>
                  <p className="text-gray-600">{badge.reason}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No badges earned yet.</p>
        )}
      </div>
    </div>
  );
};

LearningMilestones.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  streak: PropTypes.number.isRequired,
  completionBadges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LearningMilestones;