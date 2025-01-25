import "./SkillDevelopmentHeader.css";

const SkillDevelopmentHeader = () => {
    
    
  return (
    <div className="header-container">
      {/* Title */}
      <h1 className="header-title">Skill Development</h1>

      {/* Quick Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <h2 className="card-title">Total Skills</h2>
          <p className="card-value value-blue">15</p>
        </div>
        <div className="summary-card">
          <h2 className="card-title">In Progress</h2>
          <p className="card-value value-yellow">5</p>
        </div>
        <div className="summary-card">
          <h2 className="card-title">Upcoming Goals</h2>
          <p className="card-value value-red">3</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-container">
        <h3 className="progress-title">Overall Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "75%" }}></div>
        </div>
        <p className="progress-text">75% Completed</p>
      </div>
    </div>
  );
};

export default SkillDevelopmentHeader;
