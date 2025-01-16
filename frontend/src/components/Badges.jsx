import PropTypes from 'prop-types';

const Badges = ({ badges }) => {
  return (
    <div className="badges">
      <h3>Your Badges</h3>
      <ul>
        {badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))}
      </ul>
    </div>
  );
};

Badges.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Badges;
