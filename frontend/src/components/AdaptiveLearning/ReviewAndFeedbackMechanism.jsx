import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const ReviewAndFeedbackMechanism = ({ initialReflection, initialFeedback }) => {
  const [reflectionModule, setReflectionModule] = useState('');
  const [reflectionNote, setReflectionNote] = useState('');
  const [feedbackModule, setFeedbackModule] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(3);

  const handleAddReflection = async () => {
    if (!reflectionModule.trim() || !reflectionNote.trim()) {
      toast.error('Module and note are required.');
      return;
    }
    try {
      await taskServices.addReflection(reflectionModule, reflectionNote);
      toast.success('Reflection added successfully!');
      setReflectionModule('');
      setReflectionNote('');
    } catch (err) {
      console.error('Failed to add reflection:', err);
      toast.error(err.message || 'Failed to add reflection.');
    }
  };

  const handleAddFeedback = async () => {
    if (!feedbackModule.trim() || !feedbackComment.trim()) {
      toast.error('Module and comment are required.');
      return;
    }
    try {
      await taskServices.addFeedback(feedbackModule, feedbackComment, feedbackRating);
      toast.success('Feedback submitted successfully!');
      setFeedbackModule('');
      setFeedbackComment('');
      setFeedbackRating(3);
    } catch (err) {
      console.error('Failed to add feedback:', err);
      toast.error(err.message || 'Failed to add feedback.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Review & Feedback</h2>

      {/* Reflections */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Reflections</h3>
        {initialReflection.length ? (
          <ul className="space-y-2">
            {initialReflection.map((reflection, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{reflection.module}</p>
                <p className="text-gray-600">{reflection.note}</p>
                <p className="text-sm text-gray-500">
                  {new Date(reflection.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reflections added yet.</p>
        )}
      </div>

      {/* Add Reflection */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Add Reflection</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="reflectionModule" className="text-gray-700">Module</label>
            <input
              id="reflectionModule"
              type="text"
              value={reflectionModule}
              onChange={(e) => setReflectionModule(e.target.value)}
              placeholder="Enter module name"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="reflectionNote" className="text-gray-700">Note</label>
            <textarea
              id="reflectionNote"
              value={reflectionNote}
              onChange={(e) => setReflectionNote(e.target.value)}
              placeholder="Enter your reflection"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <button
            onClick={handleAddReflection}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Reflection
          </button>
        </div>
      </div>

      {/* Feedback */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Feedback</h3>
        {initialFeedback.length ? (
          <ul className="space-y-2">
            {initialFeedback.map((feedback, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{feedback.module}</p>
                <p className="text-gray-600">{feedback.comment}</p>
                <p className="text-gray-600">Rating: {'⭐'.repeat(feedback.rating)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No feedback submitted yet.</p>
        )}
      </div>

      {/* Add Feedback */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Submit Feedback</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="feedbackModule" className="text-gray-700">Module</label>
            <input
              id="feedbackModule"
              type="text"
              value={feedbackModule}
              onChange={(e) => setFeedbackModule(e.target.value)}
              placeholder="Enter module name"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="feedbackComment" className="text-gray-700">Comment</label>
            <textarea
              id="feedbackComment"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="Enter your feedback"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="feedbackRating" className="text-gray-700">Rating</label>
            <select
              id="feedbackRating"
              value={feedbackRating}
              onChange={(e) => setFeedbackRating(Number(e.target.value))}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddFeedback}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

ReviewAndFeedbackMechanism.propTypes = {
  initialReflection: PropTypes.arrayOf(
    PropTypes.shape({
      module: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialFeedback: PropTypes.arrayOf(
    PropTypes.shape({
      module: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ReviewAndFeedbackMechanism;