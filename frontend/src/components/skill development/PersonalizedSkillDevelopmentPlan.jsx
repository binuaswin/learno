import { useState } from 'react';

const PersonalizedSkillDevelopmentPlan = () => {
  // Example user data - this can be dynamically updated
  const [userProgress, setUserProgress] = useState({
    python: 60, // Progress percentage for Python
    javascript: 40, // Progress percentage for JavaScript
    communication: 80, // Progress percentage for Communication
  });

  // Function to update progress (for example)
  const handleProgressUpdate = (skill, value) => {
    setUserProgress((prevProgress) => ({
      ...prevProgress,
      [skill]: value,
    }));
  };

  // Learning Path (Static Example)
  const learningPath = [
    {
      skill: 'Python',
      nextSteps: [
        'Complete Advanced Python Course',
        'Practice Python Challenges',
        'Work on Python Projects',
        'Achieve Milestone: 80% Progress',
      ],
    },
    {
      skill: 'JavaScript',
      nextSteps: [
        'Complete Intermediate JavaScript Course',
        'Solve JavaScript Algorithms',
        'Work on JavaScript Projects',
        'Achieve Milestone: 70% Progress',
      ],
    },
    {
      skill: 'Communication',
      nextSteps: [
        'Join Communication Workshops',
        'Practice Public Speaking',
        'Read Books on Effective Communication',
        'Achieve Milestone: 90% Progress',
      ],
    },
  ];

  // Skill Recommendations (Dynamic Example)
  const skillRecommendations = [
    {
      skill: 'Data Structures',
      reason: 'If you’re working on Python, you might also want to learn Data Structures.',
    },
    {
      skill: 'React',
      reason: 'Since you are learning JavaScript, learning React will enhance your frontend development skills.',
    },
    {
      skill: 'Leadership',
      reason: 'Improving your communication skills could also benefit from developing leadership qualities.',
    },
  ];

  // Adaptive Path Logic (based on user progress)
  const adaptivePath = Object.keys(userProgress).map((skill) => {
    const progress = userProgress[skill];
    if (progress < 50) {
      return `${skill} - Recommended: Focus on basic courses and tutorials.`;
    } else if (progress >= 50 && progress < 80) {
      return `${skill} - Recommended: Intermediate-level courses and real-world practice.`;
    } else {
      return `${skill} - Recommended: Advanced topics and challenging projects.`;
    }
  });

  return (
    <div style={{ margin: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Personalized Skill Development Plan</h2>

      {/* Learning Path */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Learning Path</h3>
        <ul>
          {learningPath.map((item) => (
            <li key={item.skill} style={{ marginBottom: '20px' }}>
              <strong>{item.skill}</strong>
              <ul>
                {item.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Skill Recommendations */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Skill Recommendations</h3>
        <ul>
          {skillRecommendations.map((recommendation, index) => (
            <li key={index}>
              <strong>{recommendation.skill}:</strong> {recommendation.reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Adaptive Path */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Adaptive Path</h3>
        <ul>
          {adaptivePath.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
      </div>

      {/* Example of updating progress */}
      <div>
        <h4>Update Progress</h4>
        <button onClick={() => handleProgressUpdate('python', 75)}>Increase Python Progress to 75%</button>
      </div>
    </div>
  );
};

export default PersonalizedSkillDevelopmentPlan;
