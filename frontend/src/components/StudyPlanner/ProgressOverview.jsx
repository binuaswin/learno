import PropTypes from 'prop-types'; 
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer as LineResponsiveContainer } from 'recharts';

const ProgressOverview = ({ 
  modulesCompleted =2 , 
  totalModules =5, 
  skillProgress = { completed: 4, inProgress: 2, pending: 5}, 
  taskCompletionRate = { completed: 5, incomplete: 3} 
}) => {
  
  // Log to check if props are coming in correctly
  console.log('modulesCompleted:', modulesCompleted);
  console.log('totalModules:', totalModules);
  console.log('skillProgress:', skillProgress);
  console.log('taskCompletionRate:', taskCompletionRate);

  // Pie chart colors
  const COLORS = ['#4CAF50', '#FFC107', '#FF5722'];

  // Data for the pie chart (Completed Modules vs Total Modules)
  const moduleData = [
    { name: 'Completed', value: modulesCompleted },
    { name: 'Remaining', value: totalModules - modulesCompleted }
  ];

  // Data for skill progress
  const skillProgressData = [
    { name: 'Skills Completed', value: skillProgress.completed },
    { name: 'Skills In Progress', value: skillProgress.inProgress },
    { name: 'Skills Pending', value: skillProgress.pending }
  ];

  // Data for task completion (Completion rate as percentage)
  const taskCompletionData = [
    { name: 'Completed Tasks', value: taskCompletionRate.completed },
    { name: 'Incomplete Tasks', value: taskCompletionRate.incomplete }
  ];

  return (
    <div className="progress-overview">
      <h3>Progress Overview</h3>

      {/* Total Modules Completion (Pie Chart) */}
      <div className="chart">
        <h4>Total Modules Completed</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={moduleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {moduleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Progress (Pie Chart) */}
      <div className="chart">
        <h4>Current Skill Development Progress</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={skillProgressData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
              {skillProgressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Task Completion Rate (Line Chart) */}
      <div className="chart">
        <h4>Study Planner Task Completion Rate</h4>
        <LineResponsiveContainer width="100%" height={300}>
          <LineChart data={taskCompletionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <LineTooltip />
            <LineLegend />
          </LineChart>
        </LineResponsiveContainer>
      </div>
    </div>
  );
};

// Adding PropTypes for validation
ProgressOverview.propTypes = {
  modulesCompleted: PropTypes.number,
  totalModules: PropTypes.number,
  skillProgress: PropTypes.shape({
    completed: PropTypes.number,
    inProgress: PropTypes.number,
    pending: PropTypes.number,
  }),
  taskCompletionRate: PropTypes.shape({
    completed: PropTypes.number,
    incomplete: PropTypes.number,
  }),
};

export default ProgressOverview;
