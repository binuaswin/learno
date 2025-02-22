import  { useState } from 'react';

const MotivationalSection = () => {
  // Sample data for tips, quotes, and progress encouragement
  const [skillDevelopmentTips] = useState([
    'Practice coding daily to improve faster.',
    'Set achievable goals and take regular breaks to stay motivated.',
    'Collaborate with peers to exchange ideas and solutions.',
    'Learn through real-world projects to solidify your understanding.',
  ]);

  const [inspirationalQuotes] = useState([
    '“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.” — Dr. Seuss',
    '“Success is the sum of small efforts, repeated day in and day out.” — Robert Collier',
    '“The only way to do great work is to love what you do.” — Steve Jobs',
    '“Perseverance is not a long race; it is many short races one after the other.” — Walter Elliot',
  ]);

  const [progressEncouragement] = useState([
    'You’re doing great! You’ve mastered 3 out of 5 programming skills.',
    'Keep up the good work! You’ve completed 80% of your learning goals this week.',
    'Awesome progress! You’ve learned 5 out of 7 skills in your personal growth plan.',
  ]);

  return (
    <div style={{ margin: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Motivational Section</h2>

      {/* Skill Development Tips */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Skill Development Tips</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {skillDevelopmentTips.map((tip, index) => (
            <li key={index} style={{ padding: '10px', fontSize: '16px', color: '#555', borderBottom: '1px solid #ddd' }}>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Inspirational Quotes */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Inspirational Quotes</h3>
        <div style={{ fontSize: '18px', color: '#333', fontStyle: 'italic' }}>
          {inspirationalQuotes.map((quote, index) => (
            <p key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              {quote}
            </p>
          ))}
        </div>
      </div>

      {/* Progress Encouragement */}
      <div>
        <h3>Encouragement for Progress</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {progressEncouragement.map((message, index) => (
            <li key={index} style={{ padding: '10px', fontSize: '16px', color: '#28a745', fontWeight: 'bold' }}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotivationalSection;
