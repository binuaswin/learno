import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskAnalytics = () => {
  const data = {
    labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'], // Labels for the tasks
    datasets: [
      {
        label: 'Task Completion', // Label for the dataset
        data: [65, 59, 80, 81, 56], // The completion data for each task
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgb(75, 192, 192)', // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Task Completion Analytics',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensures the y-axis starts at 0
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskAnalytics;
