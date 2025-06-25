//frontend/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../components/auth/AuthContext';
import WelcomeSection from '../components/home/WelcomeSection';
import MotivationalElement from '../components/home/MotivationalElement';
import QuickActions from '../components/home/QuickActions';
import LearningProgress from '../components/home/LearningProgress';
import SkillDevelopment from '../components/home/SkillDevelopment';
import UpcomingTasks from '../components/home/UpcomingTasks';
import Recommendations from '../components/home/Recommendations';
import VisualInsights from '../components/home/VisualInsights';
import Footer from '../components/home/Footer';
import Sidebar from '../components/home/Sidebar';
import axios from 'axios';

const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ skillsLearned: [], upcomingGoals: [], learningProgress: 0, completedTasks: 0, totalTasks: 0 });
  const [tasks, setTasks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for child components
  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch quick stats
        const statsResponse = await axios.get(`http://localhost:5000/api/statistics/quick-stats/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats({
          skillsLearned: statsResponse.data.skillsLearned || [],
          upcomingGoals: statsResponse.data.upcomingGoals || [],
          learningProgress: statsResponse.data.learningProgress || 0,
          completedTasks: statsResponse.data.completedTasks || 0,
          totalTasks: statsResponse.data.totalTasks || 0,
        });

        // Fetch tasks
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks?user=${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(tasksResponse.data || []);

        // Fetch recommendations
        const recResponse = await axios.get(`http://localhost:5000/api/adaptiveLearning/recommendations/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRecommendations(recResponse.data || []);

        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('HomePage fetch error:', err);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className={`min-h-screen flex ${user?.preferences?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen shadow-md z-10 overflow-y-auto ${
          user?.preferences?.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <Sidebar user={user} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <main className="container mx-auto p-6 max-w-[calc(100%-16rem)]">
          <WelcomeSection user={user} />
          <MotivationalElement />
          <QuickActions userId={user?._id} />
          <LearningProgress stats={stats} />
          <SkillDevelopment skills={stats.skillsLearned} />
          <UpcomingTasks tasks={tasks} />
          <Recommendations recommendations={recommendations} />
          <VisualInsights stats={stats} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

HomePage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    preferences: PropTypes.shape({
      theme: PropTypes.string,
    }),
  }),
};

export default HomePage;