import  { useState } from 'react';
import PropTypes from 'prop-types';

const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
  };

  return (
    <div className="feedback-form">
      <h3>Your Feedback</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Please provide your feedback"
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackForm;
