import  { useState, useEffect } from 'react';
import axios from 'axios';

const QuickStats = () => {
    const [learningProgress, setLearningProgress] = useState(0);
    const [skillsLearned, setSkillsLearned] = useState([]);
    const [upcomingGoals, setUpcomingGoals] = useState([]); // Optional for goals
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    // Calculate Task Completion Rate
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Fetch Quick Stats from Backend
    const fetchQuickStats = async () => {
        try {
            const userId = 1; // Replace with dynamic user ID if needed
            const response = await axios.get(`http://localhost:3000/dashboard/quick-stats/${userId}`);
            console.log('Backend Response:', response.data);
    
            const stats = response.data;
    
            // Ensure data integrity
            setLearningProgress(stats.learningProgress || 0);
            setSkillsLearned(Array.isArray(stats.skillsLearned) ? stats.skillsLearned : stats.skillsLearned?.split(',') || []);
            setUpcomingGoals(Array.isArray(stats.upcomingGoals) ? stats.upcomingGoals : stats.upcomingGoals?.split(',') || []);
            setCompletedTasks(stats.completedTasks || 0);
            setTotalTasks(stats.totalTasks || 0);
        } catch (error) {
            console.error('Error fetching Quick Stats:', error);
        }
    };
    

    // Fetch data on component mount
    useEffect(() => {
        fetchQuickStats();
    }, []);

    return (
        <section className="quick-stats">
            <div className="stat-card">
                <h3>Learning Progress</h3>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${learningProgress}%` }}>
                    var learningProgress= parseFloat($SlideValForm.val());
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
    );
};

export default QuickStats;
