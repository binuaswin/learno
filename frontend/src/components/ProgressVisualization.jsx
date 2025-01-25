import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './SkillDevelopment.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressVisualization = () => {

  // Sample data for Skill Categories Distribution (Pie Chart)
  const skillCategoryData = {
    labels: ['Technical', 'Creative', 'Soft Skills'], // Categories
    datasets: [
      {
        data: [60, 25, 15], // Percentage of skills in each category
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverOffset: 4
      }
    ]
  };

  // Sample data for Progress Over Time (Line Chart)
  const progressOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Months
    datasets: [
      {
        label: 'Skill Progress',
        data: [20, 40, 60, 80, 100], // Skill progress over time
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="progress-visualization-container">
      <h2 className="visualization-title">Progress Visualization</h2>

      {/* Skill Categories Distribution (Pie Chart) */}
      <div className="chart-container" style={{width:"350px",height:"400px"}}>
        <h3>Skill Categories Distribution</h3>
        <Pie data={skillCategoryData} options={{ responsive: true }} />
      </div>

      {/* Progress Over Time (Line Chart) */}
      <div className="chart-container" style={{width:"450px",height:"550px"}}>
        <h3>Progress Over Time</h3>
        <Line data={progressOverTimeData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ProgressVisualization;
