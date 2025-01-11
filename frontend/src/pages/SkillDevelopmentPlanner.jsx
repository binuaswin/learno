import  { useState } from "react";
import "./SkillDevelopmentPlanner.css";

const SkillDevelopmentPlanner = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [progressInput, setProgressInput] = useState(0);

  const addSkill = () => {
    if (!skillInput) return;
    setSkills([
      ...skills,
      { name: skillInput, progress: parseInt(progressInput) || 0 },
    ]);
    setSkillInput("");
    setProgressInput(0);
  };

  const updateProgress = (index, newProgress) => {
    const updatedSkills = [...skills];
    updatedSkills[index].progress = newProgress;
    setSkills(updatedSkills);
  };

  return (
    <div className="skill-planner-container">
      <h1>Skill Development Planner</h1>
      <div className="add-skill-form">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter skill name"
        />
        <input
          type="number"
          value={progressInput}
          onChange={(e) => setProgressInput(e.target.value)}
          placeholder="Initial progress (%)"
          min="0"
          max="100"
        />
        <button onClick={addSkill}>Add Skill</button>
      </div>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <h3>{skill.name}</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.progress}
              onChange={(e) => updateProgress(index, e.target.value)}
            />
            <span>{skill.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDevelopmentPlanner;
