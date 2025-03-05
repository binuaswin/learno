import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PomodoroTimer = ({
  tasks = [],
  onTimeTracked = () => {},
  defaultFocusTime = 25, // Minutes
  defaultBreakTime = 5,  // Minutes
}) => {
  const [focusTime, setFocusTime] = useState(defaultFocusTime * 60); // Convert to seconds
  const [breakTime, setBreakTime] = useState(defaultBreakTime * 60); // Convert to seconds
  const [customFocus, setCustomFocus] = useState(defaultFocusTime);
  const [customBreak, setCustomBreak] = useState(defaultBreakTime);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [selectedTask, setSelectedTask] = useState('');

  // Timer logic
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        // End of focus period
        if (selectedTask) {
          onTimeTracked(selectedTask, focusTime / 60); // Report time in minutes
        }
        setIsBreak(true);
        setTimeLeft(breakTime);
      } else {
        // End of break period
        setIsBreak(false);
        setTimeLeft(focusTime);
        setIsActive(false);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isBreak, focusTime, breakTime, selectedTask, onTimeTracked]);

  // Start/Stop timer
  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(focusTime);
  };

  // Customize timer durations
  const handleCustomize = (e) => {
    e.preventDefault();
    const newFocus = parseInt(customFocus, 10) * 60;
    const newBreak = parseInt(customBreak, 10) * 60;
    setFocusTime(newFocus);
    setBreakTime(newBreak);
    setTimeLeft(newFocus);
    setIsActive(false);
    setIsBreak(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-timer">
      <h3>Pomodoro Timer</h3>
      <div className="timer-container">
        <div className="timer-details">
          <p className="focus-time">
            {isBreak ? 'Break Time' : 'Focus Time'}: {formatTime(timeLeft)}
          </p>
          <p>Task: {selectedTask || 'None selected'}</p>
        </div>
        <div className="timer-controls">
          <button
            className="start-button"
            onClick={toggleTimer}
            disabled={!selectedTask && !isActive}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="reset-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>

      {/* Task Selection */}
      <div className="task-selection">
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="task-select"
        >
          <option value="">Select a Task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.name}>
              {task.name}
            </option>
          ))}
        </select>
      </div>

      {/* Customization Form */}
      <form onSubmit={handleCustomize} className="customize-form">
        <label>
          Focus Time (min):
          <input
            type="number"
            value={customFocus}
            onChange={(e) => setCustomFocus(e.target.value)}
            min="1"
            className="custom-input"
          />
        </label>
        <label>
          Break Time (min):
          <input
            type="number"
            value={customBreak}
            onChange={(e) => setCustomBreak(e.target.value)}
            min="1"
            className="custom-input"
          />
        </label>
        <button type="submit" className="customize-button">
          Apply
        </button>
      </form>
    </div>
  );
};

PomodoroTimer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onTimeTracked: PropTypes.func,
  defaultFocusTime: PropTypes.number,
  defaultBreakTime: PropTypes.number,
};

export default PomodoroTimer;