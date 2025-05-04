import { useState, useEffect } from 'react';
import './SkillDevelopment.css';

const SkillDevelopment = () => {
  const [skills, setSkills] = useState([
    {
      skillName: 'JavaScript',
      category: 'Technical',
      description: 'Learn advanced JavaScript concepts.',
      targetLevel: 'Intermediate',
      deadline: '2025-06-30',
    },
    {
      skillName: 'Creative Writing',
      category: 'Creative',
      description: 'Improve writing skills through daily practice.',
      targetLevel: 'Beginner',
      deadline: '2025-05-30',
    }
  ]);

  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [description, setDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [deadline, setDeadline] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [recommendedSkills, setRecommendedSkills] = useState([]);

  // Generate recommendations based on user's current skills
  useEffect(() => {
    const allSkills = [
      { skillName: 'Python', category: 'Technical', level: 'Beginner' },
      { skillName: 'Creative Writing', category: 'Creative', level: 'Advanced' },
      { skillName: 'UI/UX Design', category: 'Creative', level: 'Intermediate' },
      { skillName: 'Machine Learning', category: 'Technical', level: 'Advanced' },
      { skillName: 'Time Management', category: 'Soft Skills', level: 'Beginner' },
      { skillName: 'Public Speaking', category: 'Soft Skills', level: 'Intermediate' }
    ];
  
    const recommended = allSkills.filter(skill => {
      return !skills.some(userSkill => userSkill.skillName === skill.skillName) &&
             skills.some(userSkill => userSkill.category === skill.category || userSkill.targetLevel === skill.level);
    });
    setRecommendedSkills(recommended);
  }, [skills]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSkill = {
      skillName,
      category,
      description,
      targetLevel,
      deadline,
    };

    if (editIndex !== null) {
      const updatedSkills = [...skills];
      updatedSkills[editIndex] = newSkill;
      setSkills(updatedSkills);
      setEditIndex(null);
    } else {
      setSkills([...skills, newSkill]);
    }

    // Reset form
    setSkillName('');
    setCategory('Technical');
    setDescription('');
    setTargetLevel('Beginner');
    setDeadline('');
  };

  const handleDelete = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleEdit = (index) => {
    const skillToEdit = skills[index];
    setSkillName(skillToEdit.skillName);
    setCategory(skillToEdit.category);
    setDescription(skillToEdit.description);
    setTargetLevel(skillToEdit.targetLevel);
    setDeadline(skillToEdit.deadline);
    setEditIndex(index);
  };

  const handleAddRecommendation = (recommendedSkill) => {
    setSkills([...skills, recommendedSkill]);
  };

  return (
    <div className="skill-development-container">
      <h2>Skill Development</h2>

      {/* Add New Skill Form */}
      <div className="add-new-skill-container">
        <h3 className="form-title">{editIndex !== null ? 'Edit Skill' : 'Add New Skill'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="skillName">Skill Name</label>
            <input
              type="text"
              id="skillName"
              name="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Technical">Technical</option>
              <option value="Creative">Creative</option>
              <option value="Soft Skills">Soft Skills</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetLevel">Target Level</label>
            <select
              id="targetLevel"
              name="targetLevel"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editIndex !== null ? 'Update Skill' : 'Add Skill'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditIndex(null)}>Reset</button>
          </div>
        </form>
      </div>

      {/* Skill List Tracker */}
      <div className="skill-list-container">
        <h3>My Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="skill-item">
              <strong>{skill.skillName}</strong> ({skill.category})
              <br />
              Level: {skill.targetLevel}
              <br />
              Description: {skill.description}
              <br />
              Deadline: {skill.deadline}
              <br />
              <button className="btn btn-edit" onClick={() => handleEdit(index)}>Edit</button>
              <button className="btn btn-delete" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Recommendations Section */}
      <div className="recommendations-container">
        <h3>Recommended Skills for You</h3>
        <ul>
          {recommendedSkills.map((recommendedSkill, index) => (
            <li key={index} className="recommended-skill-item">
              <strong>{recommendedSkill.skillName}</strong> - {recommendedSkill.category}
              <br />
              <button className="btn btn-add" onClick={() => handleAddRecommendation(recommendedSkill)}>Add to My Skills</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillDevelopment;
