import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const PersonalizedLearningPath = ({ progress, skills, nextSteps, challenges }) => {
  const handleStartModule = async (title) => {
    try {
      await taskServices.startModule(title);
      toast.success(`Started module: ${title}`);
    } catch (err) {
      console.error('Failed to start module:', err);
      toast.error(err.message || 'Failed to start module.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Your Personalized Learning Path</h2>
      
      {/* Progress */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            title={`${progress}% Complete`}
          >
            <span className="text-xs text-white pl-2">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Current Skills</h3>
        {skills.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <li key={skill.name} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{skill.name}</p>
                <p className="text-gray-600">Level: {skill.level}</p>
                <p className="text-gray-600">Progress: {skill.progress}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>

      {/* Next Steps */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Recommended Next Steps</h3>
        {nextSteps.length ? (
          <ul className="space-y-4">
            {nextSteps.map((step) => (
              <li key={step.title} className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{step.title}</p>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <button
                  onClick={() => handleStartModule(step.title)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Start
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No next steps available.</p>
        )}
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Challenges to Overcome</h3>
        {challenges.length ? (
          <ul className="space-y-2">
            {challenges.map((challenge, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded-md shadow-sm">
                <p className="text-gray-600">{challenge}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No challenges identified.</p>
        )}
      </div>
    </div>
  );
};

PersonalizedLearningPath.propTypes = {
  progress: PropTypes.number.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.oneOf(['Beginner', 'Intermediate', 'Advanced']).isRequired,
      progress: PropTypes.number.isRequired,
    })
  ).isRequired,
  nextSteps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  challenges: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PersonalizedLearningPath;