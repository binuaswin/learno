import { useState } from "react";

const SkillListTracker1 = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Python Programming",
      category: "Technical",
      level: "Intermediate",
      progress: 40,
      status: "In Progress",
      priority: "High",
      description: "Learn to write Python scripts and build applications."
    },
    {
      id: 2,
      name: "Public Speaking",
      category: "Soft Skills",
      level: "Beginner",
      progress: 20,
      status: "In Progress",
      priority: "Medium",
      description: "Improve communication and presentation skills."
    }
  ]);

  const addSkill = () => {
    const newSkill = {
      id: skills.length + 1,
      name: "New Skill",
      category: "General",
      level: "Beginner",
      progress: 0,
      status: "Pending",
      priority: "Low",
      description: "Description of the skill."
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-blue-600">Skill List Tracker</h2>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={addSkill}>
        Add Skill
      </button>
      <ul className="mt-4">
        {skills.map((skill) => (
          <li key={skill.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-bold">{skill.name}</h3>
            <p className="text-gray-600">Category: {skill.category}</p>
            <p className="text-gray-600">Level: {skill.level}</p>
            <p className="text-gray-600">Status: {skill.status}</p>
            <p className="text-gray-600">Priority: {skill.priority}</p>
            <p className="text-gray-500">{skill.description}</p>
            <div className="bg-gray-200 w-full rounded-full h-3 mt-2">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <button className="bg-red-500 text-white px-4 py-1 rounded mt-2" onClick={() => removeSkill(skill.id)}>
              Remove Skill
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillListTracker1;
