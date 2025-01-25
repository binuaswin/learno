import { useState } from "react";
import "./SkillDevelopment.css";

const SkillListTracker = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React Development", category: "Technical", level: "Intermediate", status: "In Progress" },
    { id: 2, name: "Graphic Design", category: "Creative", level: "Beginner", status: "Pending" },
    { id: 3, name: "Communication", category: "Soft Skills", level: "Advanced", status: "Achieved" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // Handle Edit Button
  const handleEditClick = (skill) => {
    setEditingSkill(skill);
    setIsEditing(true);
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    const updatedSkills = skills.map((skill) =>
      skill.id === editingSkill.id ? editingSkill : skill
    );
    setSkills(updatedSkills);
    setIsEditing(false);
    setEditingSkill(null);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingSkill({ ...editingSkill, [name]: value });
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="skill-list-container">
      <h2 className="skill-list-title">Your Skills</h2>

      {/* Skill list rendering */}
      <div className="skill-list">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-category">{`Category: ${skill.category}`}</p>
            <p className="skill-level">{`Level: ${skill.level}`}</p>
            <p className="skill-status">{`Status: ${skill.status}`}</p>

            <div className="skill-buttons">
              <button
                className="skill-button edit-button"
                onClick={() => handleEditClick(skill)}
              >
                Edit
              </button>
              <button
                className="skill-button delete-button"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Skill Modal */}
      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Skill</h3>
            <label>Skill Name:</label>
            <input
              type="text"
              name="name"
              value={editingSkill.name}
              onChange={handleInputChange}
            />
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={editingSkill.category}
              onChange={handleInputChange}
            />
            <label>Level:</label>
            <select
              name="level"
              value={editingSkill.level}
              onChange={handleInputChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <label>Status:</label>
            <select
              name="status"
              value={editingSkill.status}
              onChange={handleInputChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Achieved">Achieved</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillListTracker;
