import { useAuth } from '../components/auth/Authcontext.jsx';
import WelcomeSection from "../components/Home/WelcomeSection";
import MotivationalElement from "../components/Home/MotivationalElement";
import QuickActions from "../components/Home/QuickActions";
import LearningProgress from "../components/Home/LearningProgress";
import SkillDevelopment from "../components/Home/SkillDevelopment";
import UpcomingTasks from "../components/Home/UpcomingTasks";
import Recommendations from "../components/Home/Recommendations";
import VisualInsights from "../components/Home/VisualInsights";
import Footer from "../components/Home/Footer";
import SideBar from "../components/Home/SideBar";


const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className={`min-h-screen flex ${user?.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-10 overflow-y-auto">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <main className="container mx-auto p-6 max-w-[calc(100%-16rem)]">
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