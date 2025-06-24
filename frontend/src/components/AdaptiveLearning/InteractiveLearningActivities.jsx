import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const InteractiveLearningActivities = ({ initialQuizScore, initialExerciseResult }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizScore, setQuizScore] = useState('');
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseResult, setExerciseResult] = useState('Correct');

  const handleSubmitQuiz = async () => {
    if (!quizTitle.trim() || !quizScore || isNaN(quizScore) || quizScore < 0 || quizScore > 100) {
      toast.error('Valid quiz title and score (0-100) are required.');
      return;
    }
    try {
      await taskServices.submitQuiz(quizTitle, parseFloat(quizScore));
      toast.success(`Submitted quiz: ${quizTitle} with score ${quizScore}%`);
      setQuizTitle('');
      setQuizScore('');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      toast.error(err.message || 'Failed to submit quiz.');
    }
  };

  const handleSubmitExercise = async () => {
    if (!exerciseTitle.trim()) {
      toast.error('Valid exercise title is required.');
      return;
    }
    try {
      await taskServices.submitExercise(exerciseTitle, exerciseResult);
      toast.success(`Submitted exercise: ${exerciseTitle} with result ${exerciseResult}`);
      setExerciseTitle('');
      setExerciseResult('Correct');
    } catch (err) {
      console.error('Failed to submit exercise:', err);
      toast.error(err.message || 'Failed to submit exercise.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Interactive Learning Activities</h2>

      {/* Latest Quiz Score */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Latest Quiz Score</h3>
        <p className="text-gray-600">
          Score: {initialQuizScore}% {initialQuizScore === 0 && '(No quizzes submitted)'}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${initialQuizScore}%` }}
            title={`${initialQuizScore}%`}
          >
            <span className="text-xs text-white pl-2">{initialQuizScore}%</span>
          </div>
        </div>
      </div>

      {/* Submit Quiz */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Submit a Quiz</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={quizScore}
            onChange={(e) => setQuizScore(e.target.value)}
            placeholder="Score (0-100)"
            min="0"
            max="100"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmitQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Latest Exercise Result */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Latest Exercise Result</h3>
        <p className="text-gray-600">
          Result: {initialExerciseResult} {initialExerciseResult === 'Pending' && '(No exercises submitted)'}
        </p>
      </div>

      {/* Submit Exercise */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Submit an Exercise</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={exerciseTitle}
            onChange={(e) => setExerciseTitle(e.target.value)}
            placeholder="Enter exercise title"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={exerciseResult}
            onChange={(e) => setExerciseResult(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Correct">Correct</option>
            <option value="Incorrect">Incorrect</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            onClick={handleSubmitExercise}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

InteractiveLearningActivities.propTypes = {
  initialQuizScore: PropTypes.number.isRequired,
  initialExerciseResult: PropTypes.oneOf(['Correct', 'Incorrect', 'Pending']).isRequired,
};

export default InteractiveLearningActivities;