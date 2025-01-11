import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "./ProgressDashboard.css";

const ProgressDashboard = () => {
  const [skills] = useState([
    { name: "JavaScript", progress: 75 },
    { name: "React", progress: 60 },
    { name: "AI & ML", progress: 50 },
    { name: "CSS", progress: 90 },
  ]);

  const [studyProgress] = useState(80);

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="progress-dashboard-container">
      <h1>Progress Dashboard</h1>

      <div className="charts">
        {/* Skill Progress Pie Chart */}
        <div className="chart">
          <h2>Skill Development Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skills}
                dataKey="progress"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {skills.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Study Progress Bar */}
        <div className="chart">
          <h2>Study Planner Progress</h2>
          <div className="progress-bar-container">
            <div className="progress-bar-background">
              <div
                className="progress-bar"
                style={{ width: `${studyProgress}%` }}
              ></div>
            </div>
            <span>{studyProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
