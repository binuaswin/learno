import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SkillDevelopmentTracker = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", category: "Technical", level: "Beginner", progress: 0 });
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState("");
  const categories = ["Technical", "Soft Skills", "Creative", "Other"];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSkills(res.data.skills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills");
      }
    };
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name || newSkill.progress < 0 || newSkill.progress > 100) {
      setError("Skill name is required, and progress must be 0-100.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/skills",
        { skill_id: Date.now().toString(), ...newSkill },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSkills([...skills, res.data.skill]);
      setNewSkill({ name: "", category: "Technical", level: "Beginner", progress: 0 });
      setError("");
    } catch (err) {
      console.error("Error adding skill:", err);
      setError(err.response?.data?.message || "Failed to add skill");
    }
  };

  const handleUpdateSkill = async (skill) => {
    if (!skill.name || skill.progress < 0 || skill.progress > 100) {
      setError("Skill name is required, and progress must be 0-100.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/skills/${skill.skill_id}`,
        skill,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setSkills(skills.map((s) => (s.skill_id === skill.skill_id ? res.data.skill : s)));
      setIsEditing(null);
      setError("");
    } catch (err) {
      console.error("Error updating skill:", err);
      setError(err.response?.data?.message || "Failed to update skill");
    }
  };

  const handleDeleteSkill = async (skill_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${skill_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(skills.filter((s) => s.skill_id !== skill_id));
      setError("");
    } catch (err) {
      console.error("Error deleting skill:", err);
      setError(err.response?.data?.message || "Failed to delete skill");
    }
  };

  const chartData = {
    labels: skills.map((skill) => skill.name),
    datasets: [{
      label: "Skill Progress (%)",
      data: skills.map((skill) => skill.progress),
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Skill Development Progress" },
    },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  return (
    <div className="skill-development-tracker bg-white shadow-lg rounded-xl p-6 mb-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Skill Development Tracker</h3>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      {/* Add New Skill */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Add New Skill</h4>
        <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Skill Name (e.g., Python)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input
            type="number"
            value={newSkill.progress}
            onChange={(e) => setNewSkill({ ...newSkill, progress: parseInt(e.target.value) || 0 })}
            min="0"
            max="100"
            placeholder="Progress (%)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add Skill
          </button>
        </form>
      </div>

      {/* Skills Overview */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Skills Overview</h4>
        {skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.skill_id} className="p-4 bg-gray-50 rounded-lg">
                {isEditing === skill.skill_id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => setSkills(skills.map((s) => (s.skill_id === skill.skill_id ? { ...s, name: e.target.value } : s)))}
                      className="w-full p-2 border rounded-lg"
                    />
                    <select
                      value={skill.category}
                      onChange={(e) => setSkills(skills.map((s) => (s.skill_id === skill.skill_id ? { ...s, category: e.target.value } : s)))}
                      className="w-full p-2 border rounded-lg"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <select
                      value={skill.level}
                      onChange={(e) => setSkills(skills.map((s) => (s.skill_id === skill.skill_id ? { ...s, level: e.target.value } : s)))}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <input
                      type="number"
                      value={skill.progress}
                      onChange={(e) => setSkills(skills.map((s) => (s.skill_id === skill.skill_id ? { ...s, progress: parseInt(e.target.value) || 0 } : s)))}
                      min="0"
                      max="100"
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateSkill(skill)}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(skill.skill_id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.skill_id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Category: {skill.category}</p>
                    <p className="text-sm text-gray-600">Level: {skill.level}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{skill.progress}% Complete</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No skills tracked yet.</p>
        )}
      </div>

      {/* Chart Visualization */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Progress Chart</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Skill Categories */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Skill Categories</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category} className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="font-medium text-gray-800">{category}</p>
              <p className="text-sm text-gray-600">
                {skills.filter((skill) => skill.category === category).length} skills
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentTracker;