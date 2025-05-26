//frontend/src/components/skill development/AddNewSkill.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewSkill.css';
import { v4 as uuidv4 } from 'uuid';

const AddNewSkill = ({ onSkillAdded }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [loading, setLoading] = useState(false);

  // Debug loading state
  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted, skillName:', skillName, 'category:', category);

    if (!skillName.trim()) {
      toast.error('Skill name is required.');
      console.log('Validation failed: skillName is empty');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const payload = {
        skillName: skillName.trim(),
        category,
        skill_id: uuidv4(),
        level: 'Beginner',
        progress: 0,
      };
      console.log('Sending payload:', payload);

      const res = await axios.post(
        'http://localhost:5000/api/skills',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSkillName('');
      setCategory('Technical');
      toast.success('Skill added successfully!');
      console.log('Skill added, response:', res.data);
      if (onSkillAdded) {
        onSkillAdded(res.data.skill);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error('Error adding skill:', errorMsg, err.response?.data || err);
      toast.error(errorMsg || 'Failed to add skill.');
    } finally {
      setLoading(false);
    }
  };

  // Debug form rendering
  console.log('AddNewSkill rendered, props:', { onSkillAdded });

  return (
    <div className="add-new-skill-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="add-skill-card">
        <h3>Add New Skill</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="skillName">Skill Name</label>
            <input
              type="text"
              id="skillName"
              value={skillName}
              onChange={(e) => {
                setSkillName(e.target.value);
                console.log('Skill name input:', e.target.value);
              }}
              placeholder="e.g., JavaScript"
              className="input-field"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                console.log('Category selected:', e.target.value);
              }}
              className="input-field"
              disabled={loading}
            >
              <option value="Technical">Technical</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Creative">Creative</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            onClick={() => console.log('Submit button clicked')}
          >
            {loading ? 'Adding...' : 'Add Skill'}
          </button>
        </form>
      </div>
    </div>
  );
};

AddNewSkill.propTypes = {
  onSkillAdded: PropTypes.func,
};

export default AddNewSkill;