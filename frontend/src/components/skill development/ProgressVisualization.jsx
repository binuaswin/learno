
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, BarElement, CategoryScale, LinearScale);

const ProgressVisualization = () => {
  // Skill Categories Distribution Data (Pie Chart)
  const categoryData = {
    labels: ['Technical', 'Soft Skills', 'Creative'], // Skill categories
    datasets: [
      {
        data: [40, 30, 30], // Example data (percentages for each category)
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each category
        borderWidth: 1,
      },
    ],
  };

  // Progress Over Time Data (Line Chart)
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Time (months)
    datasets: [
      {
        label: 'Skill Progress Over Time',
        data: [10, 20, 30, 40, 50, 60], // User skill progress (in percentage)
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  // Skills Mastery Levels Data (Bar Chart)
  const masteryData = {
    labels: ['JavaScript', 'Communication', 'Graphic Design'], // Example skills
    datasets: [
      {
        label: 'Skills Mastery Levels',
        data: [2, 3, 1], // Mastery level (1=Beginner, 2=Intermediate, 3=Advanced)
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each skill
      },
    ],
  };

  return (
    <div className='flex flex-row gap-20'>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Progress Visualization</h2>
      
      {/* Skill Categories Distribution */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ textAlign: 'center' }}>Skill Categories Distribution</h3>
        <Pie data={categoryData} />
      </div>
      
      {/* Progress Over Time */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ textAlign: 'center' }}>Progress Over Time</h3>
        <Line data={progressData} />
      </div>
      
      {/* Skills Mastery Levels */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ textAlign: 'center' }}>Skills Mastery Levels</h3>
        <Bar data={masteryData} />
      </div>
    </div>
  );
};

export default ProgressVisualization;
