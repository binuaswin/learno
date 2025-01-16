import PropTypes from 'prop-types';
import './PersonalizedRecommendation.css';

const PersonalizedRecommendations = ({ userProgress, supplementaryContent, skillGapsRecommendations, modules }) => {
  // Function to get next module to learn
  const getNextBestModule = () => {
    const completedModuleNames = userProgress.completedModules;
    const nextModule = modules.find((module) => !completedModuleNames.includes(module.name));
    return nextModule ? nextModule.name : "No more modules to suggest.";
  };

  return (
    <section className="personalized-recommendations">
      <h2>Personalized Recommendations</h2>

      {/* Next Best Module */}
      <div className="recommendation">
        <h3>Next Best Module:</h3>
        <p>{getNextBestModule()}</p>
      </div>

      {/* Supplementary Content */}
      <div className="recommendation">
        <h3>Supplementary Content:</h3>
        <ul>
          {supplementaryContent.map((content, index) => (
            <li key={index}>
              <a href={content.link} target="_blank" rel="noopener noreferrer">
                {content.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Skill Gaps Addressed */}
      <div className="recommendation">
        <h3>Skill Gaps Addressed:</h3>
        <ul>
          {userProgress.gaps.map((gap, index) => (
            <li key={index}>
              <p>{skillGapsRecommendations[gap]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// PropTypes validation
PersonalizedRecommendations.propTypes = {
  userProgress: PropTypes.shape({
    completedModules: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentModule: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    gaps: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  supplementaryContent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  skillGapsRecommendations: PropTypes.objectOf(PropTypes.string).isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default PersonalizedRecommendations;
