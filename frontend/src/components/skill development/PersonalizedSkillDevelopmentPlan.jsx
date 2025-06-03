//frontend/src/components/skill development/PersonalizedSkillDevelopmentPlan.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/components/auth/Authcontext';

const PersonalizedSkillDevelopmentPlan = () => {
  const { user } = useAuth();
  const [learningPath, setLearningPath] = useState([]);
  const [skillRecommendations, setSkillRecommendations] = useState([]);
  const [adaptivePath, setAdaptivePath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressUpdate, setProgressUpdate] = useState({ skillId: '', progress: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch skill plan
  useEffect(() => {
    const fetchSkillPlan = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!user || !token) {
          throw new Error('Please log in to view your skill plan.');
        }
        console.debug(`[${new Date().toISOString()}] PersonalizedSkillDevelopmentPlan - Fetching data from ${API_URL}/api/skills/plan`);

        const res = await axios.get(`${API_URL}/api/skills/plan`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setLearningPath(res.data.learningPath || []);
        setSkillRecommendations(res.data.skillRecommendations || []);
        setAdaptivePath(res.data.adaptivePath || []);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] PersonalizedSkillDevelopmentPlan - Fetch error:`, {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        const errorMsg = err.response?.data?.message || 'Failed to load skill plan.';
        setError(errorMsg);
        toast.error(errorMsg);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setTimeout(() => window.location.href = '/login', 1000);
        } else if (err.response?.status === 404) {
          toast.error(`Plan endpoint not found at ${API_URL}/api/skills/plan. Ensure backend is running.`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSkillPlan();
    }
  }, [user, API_URL]);

  // Update skill progress
  const handleProgressUpdate = async () => {
    if (!progressUpdate.skillId || !progressUpdate.progress) {
      toast.error('Please select a skill and enter progress.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const skill = learningPath.find((item) => item.skill_id === progressUpdate.skillId);
      if (!skill) {
        throw new Error(`Skill with ID ${progressUpdate.skillId} not found in learning path.`);
      }

      const payload = {
        name: skill.skill,
        category: skill.category || 'Technical',
        level: skill.level || 'Beginner',
        progress: Number(progressUpdate.progress),
      };

      console.debug(`[${new Date().toISOString()}] PersonalizedSkillDevelopmentPlan - Updating skill ${progressUpdate.skillId}: ${JSON.stringify(payload)}`);

      await axios.put(
        `${API_URL}/api/skills/${progressUpdate.skillId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Updated progress for ${skill.skill}.`);

      // Refresh plan
      const res = await axios.get(`${API_URL}/api/skills/plan`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLearningPath(res.data.learningPath || []);
      setSkillRecommendations(res.data.skillRecommendations || []);
      setAdaptivePath(res.data.adaptivePath || []);

      setProgressUpdate({ skillId: '', progress: '' });
    } catch (err) {
      console.error(`[${new Date().toISOString()}] PersonalizedSkillDevelopmentPlan - Update error:`, {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      const errorMsg = err.response?.data?.message || 'Failed to update progress. Please try again.';
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="m-10 flex justify-center">
        <p className="text-gray-600">Loading skill development plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10 flex justify-center">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Personalized Learning Plan</h2>

      {/* Learning Path */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Learning Path</h3>
        {learningPath.length === 0 ? (
          <p className="text-gray-500 text-center">No skills added yet.</p>
        ) : (
          <ul className="space-y-4">
            {learningPath.map((item) => (
              <li key={item.skill_id} className="border-b pb-2">
                <strong className="text-gray-800">{item.skill}</strong>
                <ul className="ml-6 list-disc text-gray-600">
                  {item.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Skill Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Skill Recommendations</h3>
        {skillRecommendations.length === 0 ? (
          <p className="text-gray-500 text-center">No recommendations available.</p>
        ) : (
          <ul className="space-y-2">
            {skillRecommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">
                <strong>{rec.skill}</strong>: {rec.reason}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Adaptive Path */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Adaptive Path</h3>
        {adaptivePath.length === 0 ? (
          <p className="text-gray-500 text-center">No adaptive paths available.</p>
        ) : (
          <ul className="space-y-2">
            {adaptivePath.map((path, index) => (
              <li key={index} className="text-gray-700">{path}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Update Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Update Skill Progress</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={progressUpdate.skillId}
            onChange={(e) => setProgressUpdate({ ...progressUpdate, skillId: e.target.value })}
          >
            <option value="">Select Skill</option>
            {learningPath.map((item) => (
              <option key={item.skill_id} value={item.skill_id}>{item.skill}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            max="100"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Progress (%)"
            value={progressUpdate.progress}
            onChange={(e) => setProgressUpdate({ ...progressUpdate, progress: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleProgressUpdate}
          >
            Update Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedSkillDevelopmentPlan;
