
const LearningProgress = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
      <div className="mt-2">
        <p className="text-sm">Completed Modules: 70%</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
