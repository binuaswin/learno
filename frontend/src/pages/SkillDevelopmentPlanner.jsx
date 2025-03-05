import './SkillDevelopmentPlanner.css';
import Header from "../components/Header";
import Sidebar from "../components/Home/SideBar";
import AnalyticsAndInsights from "../components/skill development/AnalyticsAndInsights";
import LearningResources from "../components/skill development/LearningResourse"; // Note: "Resourse" might be a typo, should be "Resource"?
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

const SkillDevelopmentPlanner = () => {
  return (
    <div className="skill-planner-wrapper">
      {/* Fixed Sidebar */}
      <div className="skill-planner-sidebar">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="skill-planner-content">
        {/* Fixed Header */}
        <div className="skill-planner-header">
          <Header />
        </div>

        {/* Content Sections */}
        <div className="skill-development-overview">
          <SkillDevelopmentOverview />
        </div>

        <div className="skill-list-tracker">
          <SkillListTracker1 />
        </div>

        <div className="progress-visualization">
          <ProgressVisualization />
        </div>

        <div className="personalized-skill-plan">
          <PersonalizedSkillDevelopmentPlan />
        </div>

        <div className="learning-resources">
          <LearningResources />
        </div>

        <div className="skill-challenges">
          <SkillChallenges />
        </div>

        <div className="milestones-achievements">
          <MilestonesAndAchievements />
        </div>

        <div className="skill-review-feedback">
          <SkillReviewAndFeedback />
        </div>

        <div className="analytics-insights">
          <AnalyticsAndInsights />
        </div>

        <div className="motivational-section">
          <MotivationalSection />
        </div>

        <div className="settings-customization">
          <SettingsAndCustomization />
        </div>

        <div className="sync-across-devices">
          <SyncAcrossDevices />
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentPlanner;