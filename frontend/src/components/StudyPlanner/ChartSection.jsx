// frontend/src/components/StudyPlanner/ChartSection.jsx
import { Pie, Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ progress }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [progress, 100 - progress],
      backgroundColor: ['#4caf50', '#e0e0e0'],
      borderColor: ['#4caf50', '#e0e0e0'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="chart-container">
      <h3>Learning Progress</h3>
      <Pie data={data} />
    </div>
  );
};

ProgressChart.propTypes = {
  progress: PropTypes.number.isRequired,
};

const TimeManagementChart = ({ timeData }) => {
  const data = {
    labels: ['Learning', 'Skill Development', 'Study Planner'],
    datasets: [{
      data: timeData,
      backgroundColor: ['#f44336', '#2196f3', '#ffeb3b'],
      borderColor: ['#f44336', '#2196f3', '#ffeb3b'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="chart-container">
      <h3>Time Management</h3>
      <Doughnut data={data} />
    </div>
  );
};

TimeManagementChart.propTypes = {
  timeData: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const ChartSection = ({ tasks = [] }) => {
  if (!Array.isArray(tasks)) {
    return <section className="charts-section"><p className="error">Unable to load charts. Please try again.</p></section>;
  }

  const totalCompletion = tasks.reduce((sum, task) => sum + (task.completion || 0), 0);
  const progress = tasks.length > 0 ? Math.round(totalCompletion / tasks.length) : 0;
  const timeData = [
    tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0),
    0,
    tasks.length * 10,
  ];

  return (
    <section className="charts-section">
      <div className="chart-item" style={{ width: "450px", height: "550px" }}>
        <ProgressChart progress={progress} />
      </div>
      <div className="chart-item" style={{ width: "450px", height: "550px" }}>
        <TimeManagementChart timeData={timeData} />
      </div>
    </section>
  );
};

ChartSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completion: PropTypes.number,
      timeSpent: PropTypes.number,
    })
  ).isRequired,
};

export default ChartSection;