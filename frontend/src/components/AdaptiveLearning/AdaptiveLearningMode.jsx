import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const AdaptiveLearningMode = ({ initialPace, initialContentFormat, initialLearningStyle }) => {
  const [pace, setPace] = useState(initialPace);
  const [contentFormat, setContentFormat] = useState(initialContentFormat);
  const [learningStyle, setLearningStyle] = useState(initialLearningStyle);

  const handleUpdatePreferences = async () => {
    try {
      await taskServices.updateLearningMode({ pace, contentFormat, learningStyle });
      toast.success('Learning mode preferences updated successfully!');
    } catch (err) {
      console.error('Failed to update learning mode:', err);
      toast.error(err.message || 'Failed to update learning mode.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Adaptive Learning Mode</h2>

      {/* Current Preferences */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Current Learning Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="font-medium text-gray-800">Pace</p>
            <p className="text-gray-600">{pace}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="font-medium text-gray-800">Content Format</p>
            <p className="text-gray-600">{contentFormat}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <p className="font-medium text-gray-800">Learning Style</p>
            <p className="text-gray-600">{learningStyle}</p>
          </div>
        </div>
      </div>

      {/* Update Preferences */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Update Learning Preferences</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="pace" className="text-gray-700">Learning Pace</label>
            <select
              id="pace"
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Slow">Slow</option>
              <option value="Moderate">Moderate</option>
              <option value="Fast">Fast</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="contentFormat" className="text-gray-700">Content Format</label>
            <select
              id="contentFormat"
              value={contentFormat}
              onChange={(e) => setContentFormat(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Videos">Videos</option>
              <option value="Articles">Articles</option>
              <option value="Interactive">Interactive</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="learningStyle" className="text-gray-700">Learning Style</label>
            <select
              id="learningStyle"
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Visual">Visual</option>
              <option value="Auditory">Auditory</option>
              <option value="Reading/Writing">Reading/Writing</option>
              <option value="Kinesthetic">Kinesthetic</option>
            </select>
          </div>
          <button
            onClick={handleUpdatePreferences}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

AdaptiveLearningMode.propTypes = {
  initialPace: PropTypes.oneOf(['Slow', 'Moderate', 'Fast']).isRequired,
  initialContentFormat: PropTypes.oneOf(['Videos', 'Articles', 'Interactive']).isRequired,
  initialLearningStyle: PropTypes.oneOf(['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic']).isRequired,
};

export default AdaptiveLearningMode;