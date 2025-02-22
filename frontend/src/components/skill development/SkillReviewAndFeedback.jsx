import  { useState } from 'react';

// Sample data for feedback
const feedbackData = [
  {
    id: 1,
    reviewer: 'Instructor John',
    rating: 4,
    comment: 'Great progress on mastering Python. Keep practicing more complex problems.',
    date: '2025-02-15',
  },
  {
    id: 2,
    reviewer: 'Peer Alice',
    rating: 3,
    comment: 'Good effort on learning HTML, but there are a few areas you can improve.',
    date: '2025-01-10',
  },
];

const SkillReviewAndFeedback = () => {
  const [reflection, setReflection] = useState({ achievement: '', struggles: '' });
  const [feedbacks, setFeedbacks] = useState(feedbackData);
  const [newFeedback, setNewFeedback] = useState({ reviewer: '', rating: 1, comment: '' });

  // Handle self-reflection change
  const handleReflectionChange = (e) => {
    setReflection({ ...reflection, [e.target.name]: e.target.value });
  };

  // Handle adding new feedback
  const addFeedback = (e) => {
    e.preventDefault();
    const updatedFeedbacks = [
      ...feedbacks,
      { ...newFeedback, id: feedbacks.length + 1, date: new Date().toLocaleDateString() },
    ];
    setFeedbacks(updatedFeedbacks);
    setNewFeedback({ reviewer: '', rating: 1, comment: '' });
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Skill Review and Feedback</h2>

      {/* Self-Reflection Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Self-Reflection</h3>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label>
              What has been your biggest achievement in this skill?
              <textarea
                name="achievement"
                value={reflection.achievement}
                onChange={handleReflectionChange}
                placeholder="Write your achievement here..."
                style={{ width: '100%', padding: '10px', height: '80px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              What areas do you still struggle with?
              <textarea
                name="struggles"
                value={reflection.struggles}
                onChange={handleReflectionChange}
                placeholder="Describe areas you're struggling with..."
                style={{ width: '100%', padding: '10px', height: '80px' }}
              />
            </label>
          </div>
        </form>
      </div>

      {/* Peer/Instructor Feedback Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Peer/Instructor Feedback</h3>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              style={{
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f4f6f9',
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <h4>Feedback from {feedback.reviewer}</h4>
              <p><strong>Rating:</strong> {feedback.rating} / 5</p>
              <p><strong>Comment:</strong> {feedback.comment}</p>
              <p><strong>Date:</strong> {feedback.date}</p>
            </div>
          ))
        ) : (
          <p>No feedback yet. Ask for feedback from peers or instructors.</p>
        )}

        <form onSubmit={addFeedback}>
          <div style={{ marginBottom: '15px' }}>
            <label>
              Reviewer Name:
              <input
                type="text"
                value={newFeedback.reviewer}
                onChange={(e) => setNewFeedback({ ...newFeedback, reviewer: e.target.value })}
                placeholder="Enter name"
                style={{ padding: '10px', width: '100%' }}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              Rating (1 to 5):
              <input
                type="number"
                min="1"
                max="5"
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                style={{ padding: '10px', width: '100%' }}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              Feedback Comment:
              <textarea
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                placeholder="Write feedback here..."
                style={{ width: '100%', padding: '10px', height: '80px' }}
                required
              />
            </label>
          </div>

          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillReviewAndFeedback;
