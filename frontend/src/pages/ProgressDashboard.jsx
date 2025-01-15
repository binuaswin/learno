import  { useState, useEffect } from 'react';
import './ProgressDashboard.css';
import ChartsSection from '../components/ChartSection';
import RecentActivity from './RecentActivity';
import MotivationalElement from '../components/MotivationalElement';



const ProgressDashboard = () => {
  // Example static user data
  
  const tasks = [
    { id: 1, task: "Complete Module 2", dueDate: "2025-01-20", completed: false },
    { id: 2, task: "Finish JavaScript Project", dueDate: "2025-01-25", completed: false },
    { id: 3, task: "Start React Tutorial", dueDate: "2025-02-01", completed: false },
  ];

  const [taskList, setTaskList] = useState(tasks);

  // Handle task completion
  const markAsComplete = (taskId) => {
    const updatedTasks = taskList.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTaskList(updatedTasks);
  };
  const recentActivities = [
    { icon: "📘", description: "Completed 'React Basics' module", time: "2 hours ago" },
    { icon: "📝", description: "Submitted a quiz on JavaScript", time: "1 day ago" },
    { icon: "🏆", description: "Achieved Skill Level 2 in Python", time: "3 days ago" },
  ];
  
  const userName = "John Doe";  // This can be fetched dynamically from authentication data
  const completedLearningModules = 7;  // Example completed modules
  const totalLearningModules = 10; // Total modules
  const skillsLearned = ['JavaScript', 'React', 'CSS'];  // Example learned skills
  const upcomingGoals = ['Complete Node.js module', 'Master AI concepts']; // Upcoming goals
  const totalTasks = 15;  // Total number of tasks
  const completedTasks = 10;  // Completed tasks

  // Personalized recommendations (example)
  const recommendedModules = ['Advanced React', 'Node.js Basics', 'CSS Flexbox and Grid'];
  const recommendedSkills = ['Machine Learning', 'Data Science'];


  // Get current date and time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const learningProgress = (completedLearningModules / totalLearningModules) * 100;
  const taskCompletionRate = (completedTasks / totalTasks) * 100;
  const timeData = [4, 5, 6];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <header className="dashboard-header">
        <h1>Welcome back, {userName}!</h1>
        <p>{currentTime}</p> {/* Display current date and time */}
      </header>

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

      {/* Other sections like progress, tasks, goals, etc. */}
      <section className="progress-overview">
        <h2>Your Progress</h2>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "70%" }}>
            70%
          </div>
        </div>
      </section>
      {/* Visuals and Charts Section */}
      <ChartsSection progress={learningProgress} timeData={timeData} />

      {/* Upcoming Tasks */}
      {/* Upcoming Tasks or Deadlines */}
      <section className="upcoming-tasks">
        <h2>Upcoming Tasks</h2>
        <ul>
          {taskList.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span className="task-name">{task.task}</span>
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
  );
};

export default ProgressDashboard;
