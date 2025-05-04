//frontend/src/components/StudyPlanner/MotivationalSection.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import './MotivationalSection.css'; // Add your CSS styles here
const MotivationalSection = ({
  tasks = [],
  completedThreshold = 5, // Number of tasks to trigger encouragement
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Sample motivational tips/quotes
  const tipsAndQuotes = [
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "Tip: Break your study Sessions into manageable chunks to stay focused.",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Tip: Use the Pomodoro Technique to boost productivity.",
    "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
  ];

  // Cycle through tips/quotes
  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tipsAndQuotes.length);
  };

  // Count completed tasks today (simplified: assumes all tasks have a completion date)
  const today = new Date().toISOString().split('T')[0];
  const completedToday = tasks.filter(
    (task) => task.status === 'Completed' && task.completionDate?.startsWith(today)
  ).length;

  // Encouragement message
  const encouragementMessage =
    completedToday >= completedThreshold
      ? `Great job, you’ve completed ${completedToday} tasks today! Keep up the momentum!`
      : completedToday > 0
      ? `Nice work! You’ve completed ${completedToday} task${completedToday > 1 ? 's' : ''} today. Keep going!`
      : null;

  return (
    <div className="motivational-section">
      <h3>Motivation Hub</h3>
      <div className="motivational-content">
        <blockquote>{tipsAndQuotes[currentTipIndex]}</blockquote>
        <button className="next-tip-button" onClick={handleNextTip}>
          Next Tip/Quote
        </button>
      </div>

      {encouragementMessage && (
        <div className="encouragement">
          <p>{encouragementMessage}</p>
        </div>
      )}
    </div>
  );
};

MotivationalSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
      completionDate: PropTypes.string, // Optional, for tracking today's completions
    })
  ),
  completedThreshold: PropTypes.number,
};

export default MotivationalSection;
