import { useState, useEffect } from 'react';
import ChartsSection from '../components/StudyPlanner/ChartSection';
import RecentActivity from './RecentActivity';
import MotivationalElement from '../components/dashboard/MotivationalElement';
import PropTypes from 'prop-types';
import { useAuth } from '../components/auth/Authcontext.jsx';
import taskServices from '../services/taskServices.js';
import SideBar from '../components/Home/SideBar.jsx';

const ProgressDashboard = () => {
  const { user } = useAuth();
  const [taskList, setTaskList] = useState([]);
  const [userName, setUserName] = useState('Guest');
  const [recentActivities] = useState([
    { icon: "📘", description: "Completed 'React Basics' module", time: "2 hours ago" },
    { icon: "📝", description: "Submitted a quiz on JavaScript", time: "1 day ago" },
    { icon: "🏆", description: "Achieved Skill Level 2 in Python", time: "3 days ago" },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Static data (to be replaced with API calls if needed)
  const completedLearningModules = 7;
  const totalLearningModules = 10;
  const skillsLearned = ['JavaScript', 'React', 'CSS'];
  const upcomingGoals = ['Complete Node.js module', 'Master AI concepts'];
  const totalTasks = 15;
  const completedTasks = 10;
  const recommendedModules = ['Advanced React', 'Node.js Basics', 'CSS Flexbox and Grid'];
  const recommendedSkills = ['Machine Learning', 'Data Science'];

  // Fetch user data and tasks
  useEffect(() => {
    if (user) {
      setUserName(user.name || 'Guest');
      taskServices
        .fetchTasks(user.id)
        .then((tasks) => setTaskList(tasks))
        .catch((err) => console.error('Failed to fetch tasks:', err));
    }
  }, [user]);

  // Update current time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle task completion
  const markAsComplete = async (taskId) => {
    try {
      await taskServices.updateTask(taskId, { completion: 100, completed: true });
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completion: 100, completed: true } : task
        )
      );
    } catch (err) {
      console.error('Failed to mark task as complete:', err);
    }
  };

  const learningProgress = (completedLearningModules / totalLearningModules) * 100;
  const taskCompletionRate = (completedTasks / totalTasks) * 100;
  const timeData = [4, 5, 6];

  return (
    <div className={`min-h-screen flex ${user?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-10 overflow-y-auto">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Remove or comment out the Navbar */}
        {/* <Navbar /> */}
        <div className="dashboard-container container mx-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
            <p className="text-gray-500">{currentTime}</p>
          </div>

          {/* Motivational Element */}
          <MotivationalElement />

          {/* Quick Stats Section */}
          <section className="quick-stats">
            <div className="stat-card">
              <h3>Learning Progress</h3>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${learningProgress}%` }}>
                  {learningProgress.toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="stat-card">
              <h3>Skill Development</h3>
              <ul>
                {skillsLearned.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <p>Upcoming Goals:</p>
              <ul>
                {upcomingGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
            <div className="stat-card">
              <h3>Planner Overview</h3>
              <p>Completed Tasks: {completedTasks} / {totalTasks}</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${taskCompletionRate}%` }}>
                  {taskCompletionRate.toFixed(0)}%
                </div>
              </div>
            </div>
          </section>

          {/* Personalized Recommendations */}
          <section className="personalized-recommendations">
            <h2>Personalized Recommendations</h2>
            <div className="recommendations-list">
              <h3>Recommended Learning Modules:</h3>
              <ul>
                {recommendedModules.map((module, index) => (
                  <li key={index}>{module}</li>
                ))}
              </ul>
              <h3>Suggested Skills to Learn:</h3>
              <ul>
                {recommendedSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Recent Activity Section */}
          <RecentActivity activities={recentActivities} />

          {/* Progress Overview */}
          <section className="progress-overview">
            <h2>Your Progress</h2>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '70%' }}>
                70%
              </div>
            </div>
          </section>

          {/* Visuals and Charts Section */}
          <ChartsSection progress={learningProgress} timeData={timeData} />

          {/* Upcoming Tasks */}
          <section className="upcoming-tasks">
            <h2>Upcoming Tasks</h2>
            <ul>
              {taskList.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <span className="task-name">{task.task || task.name}</span>
                  <span className="due-date">{task.dueDate}</span>
                  {!task.completed && (
                    <button
                      className="mark-complete-btn"
                      onClick={() => markAsComplete(task.id)}
                    >
                      Mark as Complete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Study Goals */}
          <section className="study-goals">
            <h2>Your Study Goals</h2>
            <ul>
              <li>
                <span className="goal-text">Study 15 hours this week</span>
                <span className="goal-status in-progress">In Progress</span>
              </li>
            </ul>
          </section>

          {/* Insights */}
          <section className="insights">
            <h2>Personalized Insights</h2>
            <p>You are doing great! Keep pushing toward your goals.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      description: PropTypes.string,
      time: PropTypes.string,
    })
  ),
};

export default ProgressDashboard;