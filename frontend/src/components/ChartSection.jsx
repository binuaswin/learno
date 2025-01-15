import { Pie, Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types'; // Import PropTypes
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ progress }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderColor: ['#4caf50', '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  

  return (
    <div className="chart-container">
      <h3>Learning Progress</h3>
      <Pie data={data} />
    </div>
  );
};

// Add prop validation for ProgressChart
ProgressChart.propTypes = {
  progress: PropTypes.number.isRequired, // progress should be a required number
};

const TimeManagementChart = ({ taskData }) => {
  const data = {
    labels: ['Learning', 'Skill Development', 'Study Planner'],
    datasets: [
      {
        data: taskData,
        backgroundColor: ['#f44336', '#2196f3', '#ffeb3b'],
        borderColor: ['#f44336', '#2196f3', '#ffeb3b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Time Management</h3>
      <Doughnut data={data} />
    </div>
  );
};

// Add prop validation for TimeManagementChart
TimeManagementChart.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.number).isRequired, // taskData should be an array of numbers
};

const ChartsSection = ({ progress, timeData }) => {
  return (
    <section className="charts-section">
      <div className="chart-item" style={{width:"450px",height:"550px"}}>
        <ProgressChart progress={progress} />
      </div>
      <div className="chart-item" style={{width:"450px",height:"550px"}}>
        <TimeManagementChart taskData={timeData} />
      </div>
    </section>
  );
};

// Add prop validation for ChartsSection
ChartsSection.propTypes = {
  progress: PropTypes.number.isRequired, // progress should be a required number
  timeData: PropTypes.arrayOf(PropTypes.number).isRequired, // timeData should be an array of numbers
};

export default ChartsSection;
