import PropTypes from 'prop-types';

const OverviewSection = ({
  title = 'Study Planner',
  userName = '',
  introText = 'Welcome to your Study Planner! This tool helps you organize your study tasks, track progress, and stay on top of deadlines to boost your productivity.',
}) => {
  return (
    <div className="introduction">
      <h1>{userName ? `Your Study Schedule, ${userName}` : title}</h1>
      <p>{introText}</p>
    </div>
  );
};

OverviewSection.propTypes = {
  title: PropTypes.string,
  userName: PropTypes.string,
  introText: PropTypes.string,
};

export default OverviewSection;