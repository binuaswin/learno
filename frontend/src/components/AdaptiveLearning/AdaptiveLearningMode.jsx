import { useState } from 'react';
import PropTypes from 'prop-types';

const AdaptiveLearningMode = ({
  initialPace = 'Moderate',
  initialContentFormat = 'Articles',
  initialLearningStyle = 'Reading/Writing',
}) => {
  // State for user preferences
  const [pace, setPace] = useState(initialPace);
  const [contentFormat, setContentFormat] = useState(initialContentFormat);
  const [learningStyle, setLearningStyle] = useState(initialLearningStyle);

  // Options for dropdowns
  const paceOptions = ['Fast', 'Moderate', 'Slow'];
  const contentFormatOptions = ['Videos', 'Articles', 'Quizzes'];
  const learningStyleOptions = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'];

  // Handle form submission (for demo; could sync with backend)
  const handleSavePreferences = (e) => {
    e.preventDefault();
    alert(`Preferences saved: Pace=${pace}, Format=${contentFormat}, Style=${learningStyle}`);
    // Add backend sync logic here if needed
  };

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Adaptive Learning Mode
      </h2>

      {/* Pacing and Timing */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Pacing and Timing
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Set your preferred learning pace to tailor content delivery.
        </p>
        <select
          value={pace}
          onChange={(e) => setPace(e.target.value)}
          className="mt-2 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full sm:w-1/3"
        >
          {paceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Current Pace: {pace}
        </p>
      </div>

      {/* Flexibility in Content */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Content Format
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Choose your preferred format for learning materials.
        </p>
        <select
          value={contentFormat}
          onChange={(e) => setContentFormat(e.target.value)}
          className="mt-2 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full sm:w-1/3"
        >
          {contentFormatOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Current Format: {contentFormat}
        </p>
      </div>

      {/* Learning Style Preferences */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Learning Style Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Select your preferred learning style to adapt content delivery.
        </p>
        <select
          value={learningStyle}
          onChange={(e) => setLearningStyle(e.target.value)}
          className="mt-2 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700 w-full sm:w-1/3"
        >
          {learningStyleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Current Style: {learningStyle}
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </div>
    </section>
  );
};

// PropTypes validation
AdaptiveLearningMode.propTypes = {
  initialPace: PropTypes.oneOf(['Fast', 'Moderate', 'Slow']),
  initialContentFormat: PropTypes.oneOf(['Videos', 'Articles', 'Quizzes']),
  initialLearningStyle: PropTypes.oneOf(['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic']),
};

export default AdaptiveLearningMode;