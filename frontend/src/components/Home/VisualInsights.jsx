import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const VisualInsights = () => {
  const learningData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Learning Hours",
        data: [5, 8, 6, 10],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Visual Insights</h2>
      <div className="w-full">
        <Bar data={learningData} />
      </div>
    </div>
  );
};

export default VisualInsights;
