import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const LearningPerformanceAnalytics = ({ progressData, insights, timeSpent }) => {
  const [newTask, setNewTask] = useState('');
  const [newHours, setNewHours] = useState('');

  // Calculate total hours for relative bar widths
  const totalHours = timeSpent.reduce((sum, task) => sum + task.hours, 0) || 1;

  const handleAddTime = async () => {
    if (!newTask.trim() || !newHours || isNaN(newHours) || newHours <= 0) {
      toast.error('Valid task name and hours are required.');
      return;
    }
    try {
      await taskServices.updateTimeSpent(newTask, parseFloat(newHours));
      toast.success(`Logged ${newHours} hours for ${newTask}`);
      setNewTask('');
      setNewHours('');
    } catch (err) {
      console.error('Failed to log time:', err);
      toast.error(err.message || 'Failed to log time.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Performance Analytics</h2>

      {/* Progress */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Learning Progress</h3>
        <div className="space-y-1">
          <p className="text-gray-600">Completion: {progressData.completion}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progressData.completion}%` }}
              title={`${progressData.completion}% Complete`}
            >
              <span className="text-xs text-white pl-2">{progressData.completion}%</span>
            </div>
          </div>
          <p className="text-gray-600">Learning Speed: {progressData.speed}</p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Insights from Feedback</h3>
        {insights.length ? (
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded-md shadow-sm">
                <p className="text-gray-600">{insight}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No feedback insights available.</p>
        )}
      </div>

      {/* Time Spent */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Time Spent on Tasks</h3>
        {timeSpent.length ? (
          <div className="space-y-4">
            {timeSpent.map((task) => (
              <div key={task.task} className="space-y-1">
                <p className="text-gray-600">{task.task}: {task.hours} hours</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${(task.hours / totalHours) * 100}%` }}
                    title={`${task.hours} hours`}
                  />
                </div>
              </div>
            ))}
            <p className="text-gray-600">Total: {totalHours} hours</p>
          </div>
        ) : (
          <p className="text-gray-500">No time spent recorded.</p>
        )}
        {/* Add Time Spent */}
        <div className="mt-4 space-y-2">
          <h4 className="text-md font-medium text-gray-700">Log Time Spent</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task name"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newHours}
              onChange={(e) => setNewHours(e.target.value)}
              placeholder="Hours"
              min="0"
              step="0.1"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTime}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Log Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LearningPerformanceAnalytics.propTypes = {
  progressData: PropTypes.shape({
    completion: PropTypes.number.isRequired,
    speed: PropTypes.oneOf(['Slow', 'Moderate', 'Fast']).isRequired,
  }).isRequired,
  insights: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeSpent: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LearningPerformanceAnalytics;