import { useState } from 'react';
import { Line } from 'react-chartjs-2'; // Chart.js for comparative analysis

const AnalyticsAndInsights = () => {
  // Sample data for time spent on skills and progress stats
  const [timeSpentData] = useState([
    { skill: 'Python', timeSpent: 25 },
    { skill: 'JavaScript', timeSpent: 30 },
    { skill: 'Design', timeSpent: 15 },
    { skill: 'Communication', timeSpent: 10 },
  ]);

  const [skillsProgressStats] = useState([
    { skill: 'Python', averageTime: 15, completedExercises: 12 },
    { skill: 'JavaScript', averageTime: 18, completedExercises: 10 },
    { skill: 'Design', averageTime: 10, completedExercises: 8 },
    { skill: 'Communication', averageTime: 5, completedExercises: 6 },
  ]);

  // Comparative data for progress over the past few months (chart data)
  const [comparativeData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Python Progress',
        data: [10, 20, 30, 40, 50],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'JavaScript Progress',
        data: [5, 15, 25, 35, 45],
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      },
    ],
  });

  return (
    <div className='m-40 flex flex-row gap-10'>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Analytics and Insights</h2>

      {/* Time Spent on Skills */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Time Spent on Skills</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Skill</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Time Spent (Hours)</th>
            </tr>
          </thead>
          <tbody>
            {timeSpentData.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.skill}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.timeSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skills Progress Stats */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Skills Progress Stats</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Skill</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Average Time (Hours)</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Completed Exercises</th>
            </tr>
          </thead>
          <tbody>
            {skillsProgressStats.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.skill}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.averageTime}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.completedExercises}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparative Analysis */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Comparative Analysis</h3>
        <p style={{ fontSize: '16px', color: '#555' }}>Compare your current skill progress with the previous months.</p>
        <Line data={comparativeData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default AnalyticsAndInsights;
