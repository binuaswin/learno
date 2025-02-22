
const WelcomeSection = () => {
  const userName = "Aswin"; // Replace with dynamic user data
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Good Morning, {userName}!</h2>
      <p className="text-sm opacity-80">{currentDate}</p>
    </div>
  );
};

export default WelcomeSection;
