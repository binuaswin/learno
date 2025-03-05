import { useState } from 'react';
import PropTypes from 'prop-types';

const ReviewAndFeedbackMechanism = ({ initialReflection = {}, initialFeedback = [] }) => {
  // State for self-reflection
  const [whatWentWell, setWhatWentWell] = useState(initialReflection.whatWentWell || '');
  const [whatCouldImprove, setWhatCouldImprove] = useState(initialReflection.whatCouldImprove || '');

  // State for user feedback
  const [rating, setRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(initialFeedback);

  // Handle self-reflection submission
  const handleReflectionSubmit = (e) => {
    e.preventDefault();
    if (!whatWentWell && !whatCouldImprove) return;
    alert(`Reflection saved: Went Well - "${whatWentWell}", Could Improve - "${whatCouldImprove}"`);
    // Add backend sync logic here if needed
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 && !feedbackComment) return;
    const newFeedback = { rating, comment: feedbackComment, date: new Date().toLocaleDateString() };
    setSubmittedFeedback([...submittedFeedback, newFeedback]);
    setRating(0);
    setFeedbackComment('');
    alert(`Feedback submitted: Rating - ${newFeedback.rating}/5, Comment - "${newFeedback.comment}"`);
    // Add backend sync logic here if needed
  };

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Review and Feedback
      </h2>

      {/* Self-reflection */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Self-Reflection
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Reflect on your learning experience—what went well and what could be improved?
        </p>
        <form onSubmit={handleReflectionSubmit} className="mt-2 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              What Went Well:
            </label>
            <textarea
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
              placeholder="e.g., I understood the basics quickly."
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              What Could Improve:
            </label>
            <textarea
              value={whatCouldImprove}
              onChange={(e) => setWhatCouldImprove(e.target.value)}
              placeholder="e.g., More examples would help."
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Reflection
          </button>
        </form>
      </div>

      {/* User Feedback */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          User Feedback
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Rate your experience and provide feedback to personalize your journey.
        </p>
        <form onSubmit={handleFeedbackSubmit} className="mt-2 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              Rating (1-5):
            </label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              Comments:
            </label>
            <textarea
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="e.g., The quizzes were very helpful!"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </form>

        {/* Display Submitted Feedback */}
        {submittedFeedback.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">
              Your Feedback
            </h4>
            <ul className="mt-2 space-y-2">
              {submittedFeedback.map((fb, index) => (
                <li
                  key={index}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    Rating: {fb.rating}/5 | {fb.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{fb.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
ReviewAndFeedbackMechanism.propTypes = {
  initialReflection: PropTypes.shape({
    whatWentWell: PropTypes.string,
    whatCouldImprove: PropTypes.string,
  }),
  initialFeedback: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};

export default ReviewAndFeedbackMechanism;