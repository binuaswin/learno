import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const GamifiedElements = ({ milestones, leaderboard, rewards }) => {
  const handleUpdateMilestone = async (title, achieved) => {
    try {
      await taskServices.updateMilestone(title, achieved);
      toast.success(`Milestone "${title}" updated to ${achieved ? 'achieved' : 'unachieved'}`);
    } catch (err) {
      console.error('Failed to update milestone:', err);
      toast.error(err.message || 'Failed to update milestone.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Gamified Elements</h2>

      {/* Milestones */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Milestones</h3>
        {milestones.length ? (
          <ul className="space-y-2">
            {milestones.map((milestone) => (
              <li
                key={milestone.title}
                className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{milestone.title}</p>
                  <p className="text-gray-600">{milestone.description}</p>
                  <p className="text-sm text-gray-500">
                    Status: {milestone.achieved ? 'Achieved' : 'Not Achieved'}
                  </p>
                </div>
                <button
                  onClick={() => handleUpdateMilestone(milestone.title, !milestone.achieved)}
                  className={`px-3 py-1 rounded-md text-white ${
                    milestone.achieved ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {milestone.achieved ? 'Mark Unachieved' : 'Mark Achieved'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No milestones available.</p>
        )}
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Leaderboard</h3>
        {leaderboard.length ? (
          <div className="bg-gray-50 rounded-md shadow-sm">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.user}
                className={`p-4 flex justify-between items-center ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } ${index === 0 ? 'rounded-t-md' : ''} ${index === leaderboard.length - 1 ? 'rounded-b-md' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-800">{index + 1}.</span>
                  <p className="text-gray-800">{entry.user}</p>
                </div>
                <p className="text-gray-600">{entry.points} points</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No leaderboard data available.</p>
        )}
      </div>

      {/* Rewards */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Rewards</h3>
        {rewards.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.name} className="p-4 bg-gray-50 rounded-md shadow-sm flex items-center space-x-4">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-medium text-gray-800">{reward.name}</p>
                  <p className="text-gray-600">{reward.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No rewards available.</p>
        )}
      </div>
    </div>
  );
};

GamifiedElements.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      achieved: PropTypes.bool.isRequired,
    })
  ).isRequired,
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GamifiedElements;