//frontend/src/components/skill development/AddNewSkill.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewSkill.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddNewSkill = ({ onSkillAdded }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    console.debug(`[${new Date().toISOString()}] AddNewSkill - Loading state:`, loading);
  }, [loading]);

  const validateSkillName = (name) => {
    if (!name.trim()) return 'Skill name is required.';
    if (name.length > 100) return 'Skill name must be 100 characters or less.';
    if (!/^[a-zA-Z0-9\s-]+$/.test(name)) return 'Skill name can only contain letters, numbers, spaces, or hyphens.';
    return null;
  };

  const checkDuplicateSkill = async (skillName, skill_id) => {
    try {
      const token = localStorage.getItem('token');
      console.debug(`[${new Date().toISOString()}] AddNewSkill - Checking duplicates with GET ${API_URL}/api/skills`);
      const res = await axios.get(`${API_URL}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const skills = Array.isArray(res.data.skills) ? res.data.skills : [];
      return skills.some((s) => s.name === skillName.trim() || s.skill_id === skill_id);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] AddNewSkill - Check duplicate skill failed:`, error);
      if (error.response?.status === 404) {
        console.warn(`[${new Date().toISOString()}] AddNewSkill - GET ${API_URL}/api/skills returned 404, skipping duplicate check`);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.debug(`[${timestamp}] AddNewSkill - Form submitted:`, { skillName, category });

    const validationError = validateSkillName(skillName);
    if (validationError) {
      toast.error(validationError);
      console.debug(`[${timestamp}] AddNewSkill - Validation failed:`, validationError);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.debug(`[${timestamp}] AddNewSkill - Token:`, token ? 'Present' : 'Missing');
      if (!token) {
        throw new Error('Please log in to add a skill.');
      }

      const skill_id = uuidv4();
      const isDuplicate = await checkDuplicateSkill(skillName, skill_id);
      if (isDuplicate) {
        throw new Error('Skill name or ID already exists.');
      }

      const payload = {
        name: skillName.trim(),
        category,
        skill_id,
        level: 'Beginner',
        progress: 0,
      };
      console.debug(`[${timestamp}] AddNewSkill - Sending POST ${API_URL}/api/skills with payload:`, payload);

      const res = await axios.post(`${API_URL}/api/skills`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setSkillName('');
      setCategory('Technical');
      toast.success('Skill added successfully!');
      console.debug(`[${timestamp}] AddNewSkill - Skill added, response:`, res.data);
      if (onSkillAdded) {
        onSkillAdded(res.data.skill);
      }
    } catch (err) {
      const timestamp = new Date().toISOString();
      const errorMsg = err.response?.data?.message || err.message;
      console.error(`[${timestamp}] AddNewSkill - Error adding skill:`, errorMsg, {
        response: err.response?.data,
        status: err.response?.status,
        url: `${API_URL}/api/skills`,
      });

      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1000);
      } else if (err.response?.status === 400 && errorMsg.includes('Skill name')) {
        toast.error('This skill name is already added.');
      } else if (err.response?.status === 404) {
        toast.error(`Skills endpoint not found at ${API_URL}/api/skills. Ensure backend is running.`);
      } else {
        toast.error(errorMsg || 'Failed to add skill.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-skill-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="add-skill-card">
        <h3>Add Skill</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="skillName">Skill Name</label>
            <input
              type="text"
              id="skillName"
              value={skillName}
              onChange={(e) => {
                setSkillName(e.target.value);
                console.debug(`[${new Date().toISOString()}] AddNewSkill - Skill name input:`, e.target.value);
              }}
              placeholder="e.g., JavaScript"
              className="input-field"
              disabled={loading}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="categorySelect"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                console.debug(`[${new Date().toISOString()}] AddNewSkill - Category selected:`, e.target.value);
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
            className={`submit-btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
            onClick={() => console.debug(`[${new Date().toISOString()}] AddNewSkill - Submit button clicked`)}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Adding...
              </span>
            ) : (
              'Add Skill'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

AddNewSkill.propTypes = {
  onSkillAdded: PropTypes.func.isRequired,
};

export default AddNewSkill;