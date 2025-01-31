
const WelcomeSection = () => {
  const userName = "Aswin"; // Replace with dynamic user data
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <section className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold">Good Morning, {userName}!</h1>
      <p className="text-lg text-gray-600">{currentDate} - {currentTime}</p>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <span className="block text-gray-500">Learning Progress:</span>
          <progress value="60" max="100" className="w-full mt-2"></progress>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <span className="block text-gray-500">Skill Progress:</span>
          <progress value="45" max="100" className="w-full mt-2"></progress>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <span className="block text-gray-500">Upcoming Tasks:</span>
          <p className="mt-2 text-gray-700">3 tasks due soon</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
