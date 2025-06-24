import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const LearningRecommendations = ({ suggestedModules, skillImprovements, difficultyLevel, quizPerformance }) => {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');

  const handleStartModule = async (moduleTitle) => {
    try {
      await taskServices.startModule(moduleTitle);
      toast.success(`Started module: ${moduleTitle}`);
    } catch (err) {
      console.error('Failed to start module:', err);
      toast.error(err.message || 'Failed to start module.');
    }
  };

  const handleRemoveRecommendation = async (moduleTitle) => {
    try {
      await taskServices.updateRecommendation(moduleTitle, 'remove');
      toast.success(`Removed recommendation: ${moduleTitle}`);
    } catch (err) {
      console.error('Failed to remove recommendation:', err);
      toast.error(err.message || 'Failed to remove recommendation.');
    }
  };

  const handleAddRecommendation = async () => {
    if (!newModuleTitle.trim()) {
      toast.error('Module title cannot be empty.');
      return;
    }
    try {
      await taskServices.updateRecommendation(newModuleTitle, 'add', newDifficulty);
      toast.success(`Added recommendation: ${newModuleTitle}`);
      setNewModuleTitle('');
      setNewDifficulty('Medium');
    } catch (err) {
      console.error('Failed to add recommendation:', err);
      toast.error(err.message || 'Failed to add recommendation.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Learning Recommendations</h2>

      {/* Suggested Modules */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Suggested Modules</h3>
        {suggestedModules.length ? (
          <ul className="space-y-4">
            {suggestedModules.map((module) => (
              <li
                key={module.moduleTitle}
                className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{module.moduleTitle}</p>
                  <p className="text-gray-600">Difficulty: {module.difficulty}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStartModule(module.moduleTitle)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleRemoveRecommendation(module.moduleTitle)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No modules recommended at this time.</p>
        )}
        {/* Add New Recommendation */}
        <div className="mt-4 space-y-2">
          <h4 className="text-md font-medium text-gray-700">Add a New Recommendation</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              placeholder="Enter module title"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              onClick={handleAddRecommendation}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Skill Improvements */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Areas for Improvement</h3>
        {skillImprovements.length ? (
          <ul className="space-y-2">
            {skillImprovements.map((improvement, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded-md shadow-sm">
                <p className="text-gray-600">{improvement}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skill improvements identified.</p>
        )}
      </div>

      {/* Difficulty Level */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Recommended Difficulty Level</h3>
        <p className="text-gray-600 capitalize">{difficultyLevel || 'Not specified'}</p>
      </div>

      {/* Quiz Performance */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Quiz Performance</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${quizPerformance}%` }}
            title={`${quizPerformance}% Complete`}
          >
            <span className="text-xs text-white pl-2">{quizPerformance}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

LearningRecommendations.propTypes = {
  suggestedModules: PropTypes.arrayOf(
    PropTypes.shape({
      moduleTitle: PropTypes.string.isRequired,
      difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']).isRequired,
    })
  ).isRequired,
  skillImprovements: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  quizPerformance: PropTypes.number.isRequired,
};

export default LearningRecommendations;