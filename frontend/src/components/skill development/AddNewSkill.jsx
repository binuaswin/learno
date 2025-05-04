import { useState } from 'react';
import axios from 'axios';

const AddNewSkill = () => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [description, setDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [deadline, setDeadline] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!skillName.trim()) {
      setError('Skill name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to add a skill');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/skills',
        { skillName, category, description, targetLevel, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Skill added successfully!');
      setSkillName('');
      setCategory('Technical');
      setDescription('');
      setTargetLevel('Beginner');
      setDeadline('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleReset = () => {
    setSkillName('');
    setCategory('Technical');
    setDescription('');
    setTargetLevel('Beginner');
    setDeadline('');
    setSuccess('');
    setError('');
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md max-w-md mx-auto my-8">
      <h3 className="text-2xl font-semibold text-blue-800 mb-4">Add New Skill</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
            Skill Name
          </label>
          <input
            type="text"
            id="skillName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Technical">Technical</option>
            <option value="Creative">Creative</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="targetLevel" className="block text-sm font-medium text-gray-700">
            Target Level
          </label>
          <select
            id="targetLevel"
            value={targetLevel}
            onChange={(e) => setTargetLevel(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Skill
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>
      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default AddNewSkill;