
const SkillDevelopment = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Skill Development</h3>
      <ul className="mt-2 space-y-2">
        <li className="flex justify-between">
          <span>Web Development</span>
          <span className="text-green-600 font-semibold">Intermediate</span>
        </li>
        <li className="flex justify-between">
          <span>Data Science</span>
          <span className="text-yellow-600 font-semibold">Beginner</span>
        </li>
        <li className="flex justify-between">
          <span>Machine Learning</span>
          <span className="text-red-600 font-semibold">In Progress</span>
        </li>
      </ul>
    </div>
  );
};

export default SkillDevelopment;
