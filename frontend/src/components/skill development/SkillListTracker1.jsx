//frontend/src/components/skill development/skillListTracker1.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const SkillListTracker1 = ({ newSkillAdded }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to view skills.');
      }
      console.debug(`[${new Date().toISOString()}] SkillListTracker1 - Fetching skills with GET ${API_URL}/api/skills`);
      const res = await axios.get(`${API_URL}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const fetchedSkills = Array.isArray(res.data.skills) ? res.data.skills : [];
      setSkills(fetchedSkills);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] SkillListTracker1 - Fetch error:`, error);
      const errorMsg = error.response?.data?.message || 'Failed to load skills.';
      toast.error(errorMsg);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setTimeout(() => window.location.href = '/login', 1000);
      } else if (error.response?.status === 404) {
        toast.error(`Skills endpoint not found at ${API_URL}/api/skills. Ensure backend is running.`);
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);
  
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    if (newSkillAdded) {
      const timer = setTimeout(() => {
        fetchSkills();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [newSkillAdded, fetchSkills]);

  return (
    <div className="skill-list-tracker">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3>Your Skills</h3>
      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p>No skills added yet.</p>
      ) : (
        <ul>
          {skills.map((skill) => (
            <li key={skill.skill_id}>
              {skill.name} ({skill.category}) - {skill.level} - Progress: {skill.progress}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SkillListTracker1.propTypes = {
  newSkillAdded: PropTypes.bool.isRequired,
};

export default SkillListTracker1;