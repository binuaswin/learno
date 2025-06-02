import { useState, useEffect } from 'react';
import taskServices from '../services/taskServices';

export const useSkills = (userId) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const fetchSkills = async () => {
      try {
        const skills = await taskServices.getSkills();
        setSkills(skills);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [userId]);

  return { skills, setSkills, loading, error };
};