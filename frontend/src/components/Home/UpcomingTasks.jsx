
import { CheckCircle, Calendar } from "lucide-react";

const tasks = [
  { name: "Complete React Module", dueDate: "Feb 5, 2025", priority: "High", completed: false },
  { name: "Submit Project Report", dueDate: "Feb 10, 2025", priority: "Medium", completed: true },
  { name: "Prepare for AI Exam", dueDate: "Feb 15, 2025", priority: "Low", completed: false },
];

const UpcomingTasks = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center"><Calendar className="mr-2" /> Upcoming Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center border-b py-3">
            <div>
              <p className="font-medium">{task.name}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Calendar className="mr-1 w-4 h-4" /> {task.dueDate}
                <span className={`ml-3 px-2 py-1 text-xs rounded ${task.priority === "High" ? "bg-red-500 text-white" : task.priority === "Medium" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                  {task.priority}
                </span>
              </p>
            </div>
            <button className={`p-2 rounded-full ${task.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
              <CheckCircle className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTasks;
