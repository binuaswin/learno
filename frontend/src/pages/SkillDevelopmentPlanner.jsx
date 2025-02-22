import Sidebar from "../components/Home/SideBar";
import AnalyticsAndInsights from "../components/skill development/AnalyticsAndInsights";
import LearningResources from "../components/skill development/LearningResourse";
import MilestonesAndAchievements from "../components/skill development/MilestonesAndAchievements";
import MotivationalSection from "../components/skill development/MotivationalSection";
import PersonalizedSkillDevelopmentPlan from "../components/skill development/PersonalizedSkillDevelopmentPlan";
import ProgressVisualization from "../components/skill development/ProgressVisualization";
import SettingsAndCustomization from "../components/skill development/SettingsAndCustomization";
import SkillChallenges from "../components/skill development/SkillChallenges";
import SkillDevelopmentOverview from "../components/skill development/SkillDevelopmentOverview";
import SkillListTracker1 from "../components/skill development/SkillListTracker1";
import SkillReviewAndFeedback from "../components/skill development/SkillReviewAndFeedback";
import SyncAcrossDevices from "../components/skill development/SyncAcrossDevices";
import "./SkillDevelopmentPlanner.css";



const SkillDevelopmentPlanner = () => {


  return (
    <div className="skill-planner-container">
      <SkillDevelopmentOverview />
      <SkillListTracker1 />
      <ProgressVisualization />
      <PersonalizedSkillDevelopmentPlan />
      <LearningResources />
      <SkillChallenges />
      <MilestonesAndAchievements />
      <SkillReviewAndFeedback />
      <AnalyticsAndInsights />
      <MotivationalSection />
      <SettingsAndCustomization />
      <SyncAcrossDevices />
      <Sidebar />
    </div>
  );
};

export default SkillDevelopmentPlanner;
