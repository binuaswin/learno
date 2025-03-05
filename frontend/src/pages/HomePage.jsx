import Header from "../components/Header";
import WelcomeSection from "../components/Home/WelcomeSection";
import MotivationalElement from "../components/Home/MotivationalElement";
import QuickActions from "../components/Home/QuickActions";
import LearningProgress from "../components/Home/LearningProgress";
import SkillDevelopment from "../components/Home/SkillDevelopment";
import UpcomingTasks from "../components/Home/UpcomingTasks";
import Recommendations from "../components/Home/Recommendations";
import VisualInsights from "../components/Home/VisualInsights";
import Footer from "../components/Home/Footer";
import Sidebar from "../components/Home/SideBar";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed h-screen w-64 bg-white shadow-lg z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 transition-all duration-300">
        {/* Header Section */}
        <Header />

        {/* Main Content Area */}
        <main className="container mx-auto p-4 max-w-[calc(100%-16rem)]">
          <WelcomeSection />
          <MotivationalElement />
          <QuickActions />
          <LearningProgress />
          <SkillDevelopment />
          <UpcomingTasks />
          <Recommendations />
          <VisualInsights />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;