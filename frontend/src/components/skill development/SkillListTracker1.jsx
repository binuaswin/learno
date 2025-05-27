//frontend/src/components/skill development/skillListTracker1.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import './SkillListTracker1.css';

const SkillListTracker1 = ({ newSkillAdded }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const res = await axios.get('http://localhost:5000/api/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSkills(res.data.skills);
      console.log('SkillListTracker1: Fetched skills', res.data.skills);
    } catch (err) {
      console.error('SkillListTracker1: Error fetching skills', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (newSkillAdded) {
      fetchSkills();
      console.log('SkillListTracker1: Refreshing skills due to newSkillAdded');
    }
  }, [newSkillAdded]);

  const removeSkill = async (skillId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(skills.filter((skill) => skill.skill_id !== skillId));
      console.log('SkillListTracker1: Skill deleted', skillId);
    } catch (err) {
      console.error('SkillListTracker1: Error deleting skill', err.message);
    }
  };

  if (loading) return <div>Loading skills...</div>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-blue-600">Skill List Tracker</h2>
      <ul className="mt-4">
        {skills.map((skill) => (
          <li key={skill.skill_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-bold">{skill.name}</h3>
            <p className="text-gray-600">Category: {skill.category}</p>
            <p className="text-gray-600">Level: {skill.level}</p>
            <p className="text-gray-600">Progress: {skill.progress}%</p>
            <div className="bg-gray-200 w-full rounded-full h-3 mt-2">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded mt-2"
              onClick={() => removeSkill(skill.skill_id)}
            >
              Remove Skill
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
SkillListTracker1.propTypes = {
  newSkillAdded: PropTypes.bool,
};

export default SkillListTracker1;