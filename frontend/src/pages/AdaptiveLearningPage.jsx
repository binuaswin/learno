import './AdaptiveLearningPage.css'; // Import the new CSS file
import Header from "../components/common/Header";
import Sidebar from "../components/Home/SideBar";
import OverviewSection from "../components/AdaptiveLearning/Overviewsection";
import PersonalizedLearningPath from "../components/AdaptiveLearning/PersonalizedLearningPath";
import LearningRecommendations from "../components/AdaptiveLearning/LearningRecommendations";
import LearningPerformanceAnalytics from "../components/AdaptiveLearning/LearningPerformanceAnalytics";
import InteractiveLearningActivities from "../components/AdaptiveLearning/InteractiveLearningActivities";
import SkillMasteryLevel from "../components/AdaptiveLearning/SkillMasteryLevel";
import LearningMilestones from "../components/AdaptiveLearning/LearningMilestones";
import AdaptiveLearningMode from "../components/AdaptiveLearning/AdaptiveLearningMode";
import GamifiedElements from "../components/AdaptiveLearning/GamifiedElements";
import ReviewAndFeedbackMechanism from "../components/AdaptiveLearning/ReviewAndFeedbackMechanism";
import PersonalizedRemindersAndNotifications from "../components/AdaptiveLearning/PersonalizedRemindersAndNotifications";

const AdaptiveLearning = () => {
  // Sample data (unchanged from previous)
  const sampleSkills = [
    { name: 'Python', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Beginner' },
  ];
  const sampleNextSteps = [
    { title: 'Advanced Python', description: 'Learn decorators and generators.' },
    { title: 'JavaScript Basics', description: 'Master loops and functions.' },
  ];
  const sampleChallenges = [
    'Improve debugging skills.',
    'Focus on algorithm efficiency.',
  ];
  const sampleModules = [
    { title: 'Python Loops', difficulty: 'Medium' },
    { title: 'Debugging Basics', difficulty: 'Easy' },
  ];
  const sampleSkillImprovements = [
    'Work on array manipulation.',
    'Practice error handling.',
  ];
  const sampleProgressData = { completion: 85, speed: 'Fast' };
  const sampleInsights = [
    'You have completed 85% of this module.',
    'You scored higher in technical skills than in soft skills.',
  ];
  const sampleTimeSpent = [
    { task: 'Python Coding', hours: 10 },
    { task: 'JavaScript Practice', hours: 5 },
  ];
  const sampleSkillsMastery = [
    { name: 'Python', level: 'Intermediate', progress: 75 },
    { name: 'JavaScript', level: 'Beginner', progress: 30 },
  ];
  const sampleGoals = [
    { skill: 'Python', target: 'Advanced', progress: 50 },
  ];
  const sampleAchievements = [
    { title: 'Module Master', description: 'Completed 5 modules.' },
    { title: 'Quiz Ace', description: 'Scored 90%+ on a quiz.' },
  ];
  const sampleStreak = 7;
  const sampleCompletionBadges = [
    { name: 'Python Pro', reason: 'Mastering Python skills.' },
    { name: 'Beginner Badge', reason: 'Completing your first module.' },
  ];
  const sampleMilestones = [
    { title: 'First Module', description: 'Complete your first module', achieved: true },
    { title: 'Quiz Master', description: 'Pass 3 quizzes', achieved: false },
  ];
  const sampleLeaderboard = [
    { user: 'Alice', points: 150 },
    { user: 'Bob', points: 120 },
    { user: 'John', points: 100 },
  ];
  const sampleRewards = [
    { name: '10 Points', description: 'For completing a module.' },
    { name: 'Skill Badge', description: 'For mastering a skill.' },
  ];
  const sampleReflection = {
    whatWentWell: 'I enjoyed the quizzes.',
    whatCouldImprove: 'More video content would help.',
  };
  const sampleFeedback = [
    { rating: 4, comment: 'Great module structure!', date: '02/25/2025' },
  ];
  const sampleTaskReminders = [
    { task: 'Complete Python Quiz', dueDate: '02/27/2025' },
    { task: 'Review JavaScript Basics', dueDate: '02/28/2025' },
  ];
  const sampleActivityAlerts = [
    { title: 'New Module Available', description: 'Advanced Python is now live!' },
  ];
  const sampleMotivationalMessages = [
    'You’re almost there—keep pushing forward!',
    'Great progress this week—stay consistent!',
  ];

  return (
    <div className="adaptive-learning-container">
      {/* Fixed Sidebar */}
      <div className="adaptive-learning-sidebar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="adaptive-learning-page">
        {/* Fixed Header */}
        <div className="adaptive-learning-header">
          <Header />
        </div>

        {/* Content Wrapper to Avoid Overlap */}
        <div className="content-wrapper">
          <div className="current-module-section">
            <OverviewSection userName="John" learningGoal="Python Programming" />
          </div>

          <div className="current-module-section">
            <PersonalizedLearningPath
              progress={70}
              skills={sampleSkills}
              nextSteps={sampleNextSteps}
              challenges={sampleChallenges}
            />
          </div>

          <div className="recommendations-section">
            <LearningRecommendations
              suggestedModules={sampleModules}
              skillImprovements={sampleSkillImprovements}
              difficultyLevel="Medium"
              quizPerformance={85}
            />
          </div>

          <div className="progress-tracker">
            <LearningPerformanceAnalytics
              progressData={sampleProgressData}
              insights={sampleInsights}
              timeSpent={sampleTimeSpent}
            />
          </div>

          <div className="quiz-section">
            <InteractiveLearningActivities initialQuizScore={75} initialExerciseResult="Correct" />
          </div>

          <div className="current-module-section">
            <SkillMasteryLevel skills={sampleSkillsMastery} initialGoals={sampleGoals} />
          </div>

          <div className="current-module-section">
            <LearningMilestones
              achievements={sampleAchievements}
              streak={sampleStreak}
              completionBadges={sampleCompletionBadges}
            />
          </div>

          <div className="customization-settings-section">
            <AdaptiveLearningMode
              initialPace="Moderate"
              initialContentFormat="Articles"
              initialLearningStyle="Reading/Writing"
            />
          </div>

          <div className="gamification-section">
            <GamifiedElements
              milestones={sampleMilestones}
              leaderboard={sampleLeaderboard}
              rewards={sampleRewards}
            />
          </div>

          <div className="feedback-form-section">
            <ReviewAndFeedbackMechanism
              initialReflection={sampleReflection}
              initialFeedback={sampleFeedback}
            />
          </div>

          <div className="motivational-section">
            <PersonalizedRemindersAndNotifications
              taskReminders={sampleTaskReminders}
              activityAlerts={sampleActivityAlerts}
              motivationalMessages={sampleMotivationalMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveLearning;