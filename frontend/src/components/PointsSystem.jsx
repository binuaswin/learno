import PropTypes from 'prop-types';

const PointsSystem = ({ points }) => {
  return (
    <div className="points-system">
      <h3>Your Points</h3>
      <p>You have earned {points} points!</p>
    </div>
  );
};

PointsSystem.propTypes = {
  points: PropTypes.number.isRequired,
};

export default PointsSystem;
