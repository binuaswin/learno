import {  TrendingUp } from "lucide-react";

const recommendations = [
  { title: "Mastering React", category: "Web Development" },
  { title: "Python for Data Science", category: "Machine Learning" },
  { title: "Time Management Tips", category: "Productivity" },
];

const Recommendations = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center"><TrendingUp className="mr-2" /> Personalized Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} className="flex justify-between items-center border-b py-3">
            <div>
              <p className="font-medium">{rec.title}</p>
              <p className="text-sm text-gray-500">{rec.category}</p>
            </div>
            <button className="text-blue-600 font-semibold hover:underline">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
