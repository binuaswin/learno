//fron
import  { useState, useEffect } from 'react';
import axios from 'axios';

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/skills', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(response.data.skills);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching skills');
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Skills</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {skills.length === 0 ? (
        <p className="text-gray-600">No skills added yet.</p>
      ) : (
        <ul className="space-y-4">
          {skills.map((skill) => (
            <li key={skill._id} className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800">{skill.skillName}</h3>
              <p className="text-gray-600">Category: {skill.category}</p>
              <p className="text-gray-600">Description: {skill.description}</p>
              <p className="text-gray-600">Target Level: {skill.targetLevel}</p>
              <p className="text-gray-600">Deadline: {new Date(skill.deadline).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillList;
