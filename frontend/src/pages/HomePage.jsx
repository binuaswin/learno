//import  { useState } from "react";
//import {  Menu } from "lucide-react";
import Header from "../components/Home/Header";
import WelcomeSection from "../components/Home/WelcomeSection";
import MotivationalElement from "../components/Home/MotivationalElement"
import QuickActions from "../components/Home/QuickActions";
import LearningProgress from "../components/Home/LearningProgress";
import SkillDevelopment from "../components/Home/SkillDevelopment"
import UpcomingTasks from "../components/Home/UpcomingTasks";
import Notifications from "../components/Home/Notifications";
import Recommendations from "../components/Home/Recommendations";
import VisualInsights from "../components/Home/VisualInsights";
import Footer from "../components/Home/Footer";
import Sidebar from "../components/Home/SideBar";

const HomePage = () => {
  //const [isOpen, setIsOpen] = useState(true);
  //const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
       {/* Sidebar */}
       <Sidebar />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300  p-6`}>
       
        {/* Header Section */}
        <Header />

        <main className="container mx-auto p-4">
          <WelcomeSection />
          <MotivationalElement />
          <QuickActions />
          <LearningProgress />
          <SkillDevelopment />
          <UpcomingTasks />
          <Notifications />
          <Recommendations />
          <VisualInsights />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
