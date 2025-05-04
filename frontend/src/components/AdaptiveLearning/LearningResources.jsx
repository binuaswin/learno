import PropTypes from 'prop-types';
import './LearningResources.css';

const LearningResources = ({ videoTutorials, downloadableContent, practiceProblems, externalLinks }) => {
  return (
    <section className="learning-resources">
      <h2>Learning Resources</h2>
      
      {/* Video Tutorials */}
      <div className="resources-section">
        <h3>Video Tutorials</h3>
        <ul>
          {videoTutorials.map((video, index) => (
            <li key={index}>
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Downloadable Content */}
      <div className="resources-section">
        <h3>Downloadable Content</h3>
        <ul>
          {downloadableContent.map((content, index) => (
            <li key={index}>
              <a href={content.link} download>
                {content.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Practice Problems */}
      <div className="resources-section">
        <h3>Practice Problems</h3>
        <ul>
          {practiceProblems.map((problem, index) => (
            <li key={index}>
              <a href={problem.link} target="_blank" rel="noopener noreferrer">
                {problem.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* External Links */}
      <div className="resources-section">
        <h3>External Links</h3>
        <ul>
          {externalLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

LearningResources.propTypes = {
  videoTutorials: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  downloadableContent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  practiceProblems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  externalLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LearningResources;
