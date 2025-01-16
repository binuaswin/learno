import PropTypes from 'prop-types';

const Leaderboard = ({ topLearners }) => {
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ol>
        {topLearners.map((learner, index) => (
          <li key={index}>{learner.name}: {learner.points} points</li>
        ))}
      </ol>
    </div>
  );
};

Leaderboard.propTypes = {
  topLearners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      points: PropTypes.number,
    })
  ).isRequired,
};

export default Leaderboard;
