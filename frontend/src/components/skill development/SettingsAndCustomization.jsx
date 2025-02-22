import  { useState } from 'react';

const SettingsAndCustomization = () => {
  // State variables for user customization settings
  const [skillCategories, setSkillCategories] = useState(['Technical', 'Creative', 'Soft Skills']);
  const [customCategory, setCustomCategory] = useState('');
  const [skillGoals, setSkillGoals] = useState('');
  const [learningStyle, setLearningStyle] = useState('Video');

  // Handle adding custom skill category
  const handleAddCategory = () => {
    if (customCategory && !skillCategories.includes(customCategory)) {
      setSkillCategories([...skillCategories, customCategory]);
      setCustomCategory('');
    }
  };

  // Handle form submission for skill goal
  const handleSkillGoalChange = (event) => {
    setSkillGoals(event.target.value);
  };

  // Handle selecting learning style
  const handleLearningStyleChange = (event) => {
    setLearningStyle(event.target.value);
  };

  return (
    <div style={{ margin: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Settings and Customization</h2>

      {/* Skill Categories Management */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Skill Categories Management</h3>
        <div>
          <label htmlFor="custom-category" style={{ fontSize: '16px', fontWeight: 'bold' }}>Add a Custom Skill Category:</label>
          <input
            type="text"
            id="custom-category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', width: '300px', marginRight: '10px' }}
          />
          <button onClick={handleAddCategory} style={{ padding: '8px 15px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
            Add Category
          </button>
        </div>
        <h4 style={{ marginTop: '20px' }}>Current Categories:</h4>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {skillCategories.map((category, index) => (
            <li key={index} style={{ padding: '10px', fontSize: '16px', color: '#555', borderBottom: '1px solid #ddd' }}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Goal Setting */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Skill Goal Setting</h3>
        <label htmlFor="skill-goal" style={{ fontSize: '16px', fontWeight: 'bold' }}>Define Your Skill Goal:</label>
        <textarea
          id="skill-goal"
          value={skillGoals}
          onChange={handleSkillGoalChange}
          rows="4"
          style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>Example: &apos;Learn to use advanced CSS techniques within the next 3 months.&apos;</p>
      </div>

      {/* Learning Style Preferences */}
      <div>
        <h3>Learning Style Preferences</h3>
        <div>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Preferred Learning Style:</label>
          <select
            value={learningStyle}
            onChange={handleLearningStyleChange}
            style={{ padding: '8px', fontSize: '16px', width: '300px' }}
          >
            <option value="Video">Video</option>
            <option value="Reading">Reading Material</option>
            <option value="Hands-On">Hands-On Practice</option>
          </select>
        </div>
        <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>Choose how you&apos;d like to learn best (e.g., Video tutorials, Reading materials, or Hands-on projects).</p>
      </div>
    </div>
  );
};

export default SettingsAndCustomization;
