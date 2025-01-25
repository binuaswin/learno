import  { useState } from 'react';
import './SkillDevelopment.css';

const AddNewSkill = () => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [description, setDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [deadline, setDeadline] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic to handle the new skill (e.g., updating the state or sending it to a database)
    console.log({
      skillName,
      category,
      description,
      targetLevel,
      deadline
    });

    // Reset the form after submission
    setSkillName('');
    setDescription('');
    setDeadline('');
  };

  // Handle form reset
  const handleReset = () => {
    setSkillName('');
    setCategory('Technical');
    setDescription('');
    setTargetLevel('Beginner');
    setDeadline('');
  };

  return (
    <div className="add-new-skill-container">
      <h3 className="form-title">Add New Skill</h3>
      <form onSubmit={handleSubmit}>
        {/* Skill Name */}
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

        {/* Category */}
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

        {/* Description */}
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

        {/* Target Level */}
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

        {/* Deadline */}
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

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Skill</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSkill;
