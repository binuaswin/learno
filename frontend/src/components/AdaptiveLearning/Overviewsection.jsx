import { useState } from 'react';
import PropTypes from 'prop-types';
import taskServices from '../../services/taskServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OverviewSection = ({ userName, learningGoal, progress = 0 }) => {
  const [goalInput, setGoalInput] = useState(learningGoal);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateGoal = async () => {
    if (!goalInput.trim()) {
      toast.error('Learning goal cannot be empty.');
      return;
    }
    try {
      await taskServices.updateLearningGoal(goalInput);
      toast.success('Learning goal updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update learning goal:', err);
      toast.error(err.message || 'Failed to update learning goal.');
    }
  };

  return (
    <div className="space-y-4">
      <ToastContainer position="top-right" />
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome to Adaptive Learning, {userName}!
      </h1>
      <p className="text-gray-600">
        Take control of your learning journey with personalized modules and progress tracking.
      </p>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Your Learning Goal</h3>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your learning goal"
            />
            <button
              onClick={handleUpdateGoal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setGoalInput(learningGoal);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <p className="text-gray-600">{goalInput || 'No goal set'}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Your Overall Progress</h3>
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
    </div>
  );
};

OverviewSection.propTypes = {
  userName: PropTypes.string.isRequired,
  learningGoal: PropTypes.string.isRequired,
  progress: PropTypes.number,
};

export default OverviewSection;