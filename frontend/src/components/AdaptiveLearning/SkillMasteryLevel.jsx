import { useState } from 'react';
import PropTypes from 'prop-types';

const SkillMasteryLevel = ({ skills = [], initialGoals = [] }) => {
  // State for managing mastery goals
  const [goals, setGoals] = useState(initialGoals);
  const [newGoalSkill, setNewGoalSkill] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  // Handle adding a new goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalSkill || !newGoalTarget) return;
    setGoals([...goals, { skill: newGoalSkill, target: newGoalTarget, progress: 0 }]);
    setNewGoalSkill('');
    setNewGoalTarget('');
  };

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Skill Mastery Level
      </h2>

      {/* Current Skill Level */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Current Skill Levels
        </h3>
        {skills.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                {skill.name}: {skill.level}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No skills tracked yet.
          </p>
        )}
      </div>

      {/* Skill Development Tracker */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Skill Development Tracker
        </h3>
        {skills.length > 0 ? (
          <div className="mt-2 space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-600 dark:text-gray-300">{skill.name}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {skill.progress}% Mastered
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No progress data available yet.
          </p>
        )}
      </div>

      {/* Mastery Goals */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Mastery Goals
        </h3>
        <form onSubmit={handleAddGoal} className="mt-2 flex gap-4">
          <input
            type="text"
            value={newGoalSkill}
            onChange={(e) => setNewGoalSkill(e.target.value)}
            placeholder="Skill (e.g., Python)"
            className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <input
            type="text"
            value={newGoalTarget}
            onChange={(e) => setNewGoalTarget(e.target.value)}
            placeholder="Target (e.g., Advanced)"
            className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Goal
          </button>
        </form>
        {goals.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {goals.map((goal, index) => (
              <li key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-600 dark:text-gray-300">
                  Goal: Reach {goal.target} in {goal.skill}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Progress: {goal.progress}%
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            No mastery goals set yet.
          </p>
        )}
      </div>
    </section>
  );
};

// PropTypes validation
SkillMasteryLevel.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
    })
  ),
  initialGoals: PropTypes.arrayOf(
    PropTypes.shape({
      skill: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
    })
  ),
};

export default SkillMasteryLevel;