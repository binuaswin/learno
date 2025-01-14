import  { useState } from "react";
import "./LearningModules.css";
import NavigationBar from "../components/NavigationBar";

const LearningModules = () => {
  const [modules] = useState([
    { id: 1, title: "Introduction to AI", progress: 40 },
    { id: 2, title: "Machine Learning Basics", progress: 60 },
    { id: 3, title: "Deep Learning Essentials", progress: 20 },
    { id: 4, title: "Data Science for Beginners", progress: 80 },
  ]);

  const handleStartLearning = (moduleId) => {
    alert(`You have started learning: Module ${moduleId}`);
  };

  return (
    
    <div className="learning-modules-container">
      <NavigationBar />
      <h1>Learning Modules</h1>
      <div className="modules-list">
        {modules.map((module) => (
          <div key={module.id} className="module-card">
            <h2>{module.title}</h2>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
            <p>{module.progress}% completed</p>
            <button onClick={() => handleStartLearning(module.id)}>
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModules;
