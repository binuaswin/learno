import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../../services/taskServices';

const SkillMasteryLevel = ({ skills, initialGoals }) => {
  const [newGoalSkill, setNewGoalSkill] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('Intermediate');

  const handleAddGoal = async () => {
    if (!newGoalSkill.trim()) {
      toast.error('Skill name is required.');
      return;
    }
    try {
      await taskServices.addGoal(newGoalSkill, newGoalTarget);
      toast.success(`Added goal: ${newGoalSkill} - ${newGoalTarget}`);
      setNewGoalSkill('');
      setNewGoalTarget('Intermediate');
    } catch (err) {
      console.error('Failed to add goal:', err);
      toast.error(err.message || 'Failed to add goal.');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" />
      <h2 className="text-xl font-semibold text-gray-800">Skill Mastery Level</h2>

      {/* Current Skills */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Current Skills</h3>
        {skills.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <li key={skill.name} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{skill.name}</p>
                <p className="text-gray-600">Level: {skill.level}</p>
                <p className="text-gray-600">Progress: {skill.progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                    title={`${skill.progress}%`}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills added yet.</p>
        )}
      </div>

      {/* Learning Goals */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Learning Goals</h3>
        {initialGoals.length ? (
          <ul className="space-y-2">
            {initialGoals.map((goal) => (
              <li key={goal.skill} className="p-4 bg-gray-50 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{goal.skill}</p>
                <p className="text-gray-600">Target Level: {goal.target}</p>
                <p className="text-gray-600">Progress: {goal.progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                    title={`${goal.progress}% toward ${goal.target}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No goals set yet.</p>
        )}
      </div>

      {/* Add New Goal */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-700">Set a New Goal</h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={newGoalSkill}
            onChange={(e) => setNewGoalSkill(e.target.value)}
            placeholder="Enter skill name"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newGoalTarget}
            onChange={(e) => setNewGoalTarget(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button
            onClick={handleAddGoal}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

SkillMasteryLevel.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.oneOf(['Beginner', 'Intermediate', 'Advanced']).isRequired,
      progress: PropTypes.number.isRequired,
    })
  ).isRequired,
  initialGoals: PropTypes.arrayOf(
    PropTypes.shape({
      skill: PropTypes.string.isRequired,
      target: PropTypes.oneOf(['Beginner', 'Intermediate', 'Advanced']).isRequired,
      progress: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SkillMasteryLevel;