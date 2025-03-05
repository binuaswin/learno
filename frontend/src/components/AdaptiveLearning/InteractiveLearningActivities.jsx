import { useState } from 'react';
import PropTypes from 'prop-types';

const InteractiveLearningActivities = ({ initialQuizScore = null, initialExerciseResult = null }) => {
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState(initialQuizScore ? `Previous Score: ${initialQuizScore}%` : null);

  // Exercise State
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [exerciseFeedback, setExerciseFeedback] = useState(initialExerciseResult ? `Previous Result: ${initialExerciseResult}` : null);

  // Sample Quiz Data
  const quizQuestion = {
    question: 'What is the primary purpose of React’s Virtual DOM?',
    options: ['To update the real DOM directly', 'To optimize rendering', 'To store data', 'To handle events'],
    correctAnswer: 'To optimize rendering',
  };

  // Sample Exercise Data
  const exercisePrompt = 'Write a JavaScript function that returns "Hello World".';

  // Handle Quiz Submission
  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!quizAnswer) {
      setQuizFeedback('Please select an answer.');
      return;
    }
    const isCorrect = quizAnswer === quizQuestion.correctAnswer;
    setQuizFeedback(
      isCorrect
        ? 'Correct! Great job understanding the Virtual DOM.'
        : 'Incorrect. The Virtual DOM optimizes rendering. Review this topic!'
    );
    setQuizStarted(false); // Reset for next attempt
    setQuizAnswer('');
  };

  // Handle Exercise Submission
  const handleExerciseSubmit = (e) => {
    e.preventDefault();
    if (!exerciseAnswer.trim()) {
      setExerciseFeedback('Please enter your answer.');
      return;
    }
    const normalizedAnswer = exerciseAnswer.trim().toLowerCase();
    const isCorrect = normalizedAnswer.includes('hello world');
    setExerciseFeedback(
      isCorrect
        ? 'Correct! Your function works perfectly.'
        : 'Incorrect. Ensure your function returns "Hello World". Try again!'
    );
    setExerciseStarted(false); // Reset for next attempt
    setExerciseAnswer('');
  };

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Interactive Learning Activities
      </h2>

      {/* Assessments/Quizzes */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Quiz</h3>
        {!quizStarted ? (
          <button
            onClick={() => setQuizStarted(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Quiz
          </button>
        ) : (
          <form onSubmit={handleQuizSubmit} className="mt-2 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">{quizQuestion.question}</p>
            <div className="space-y-2">
              {quizQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="quizAnswer"
                    value={option}
                    checked={quizAnswer === option}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-600 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Answer
            </button>
          </form>
        )}
        {quizFeedback && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">{quizFeedback}</p>
        )}
      </div>

      {/* Interactive Exercises */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Exercise</h3>
        {!exerciseStarted ? (
          <button
            onClick={() => setExerciseStarted(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Exercise
          </button>
        ) : (
          <form onSubmit={handleExerciseSubmit} className="mt-2 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">{exercisePrompt}</p>
            <textarea
              value={exerciseAnswer}
              onChange={(e) => setExerciseAnswer(e.target.value)}
              placeholder="Write your code here..."
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              rows="4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Answer
            </button>
          </form>
        )}
        {exerciseFeedback && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">{exerciseFeedback}</p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
InteractiveLearningActivities.propTypes = {
  initialQuizScore: PropTypes.number, // Nullable, for initial feedback
  initialExerciseResult: PropTypes.string, // Nullable, for initial feedback
};

export default InteractiveLearningActivities;