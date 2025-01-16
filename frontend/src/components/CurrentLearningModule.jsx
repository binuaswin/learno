import PropTypes from 'prop-types';
import './CurrentLearningModule.css';

const CurrentLearningModule = ({ module }) => {
  return (
    <section className="current-module">
      <h2>Current Learning Module</h2>
      <div className="module-card">
        <h3>{module.title}</h3>
        <p>{module.description}</p>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${module.progress}%` }}
          >
            {module.progress}%
          </div>
        </div>
        <p>Estimated Time: {module.estimatedTime}</p>
        <div className="resources">
          <h4>Resources:</h4>
          <ul>
            {module.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="complete-btn"
          onClick={() => alert('Module marked as complete!')}
        >
          Mark as Complete
        </button>
      </div>
    </section>
  );
};

CurrentLearningModule.propTypes = {
  module: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    estimatedTime: PropTypes.string.isRequired,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CurrentLearningModule;
