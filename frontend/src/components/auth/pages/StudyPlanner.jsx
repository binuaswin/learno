// frontend/src/pages/StudyPlanner.jsx

import './StudyPlanner.css';
import Sidebar from "../components/Home/SideBar";
import Header from "../components/Header";

import OverviewSection from "../components/StudyPlanner/OverviewSection";
import StudyTaskList from "../components/StudyPlanner/StudyTaskList";
import CalendarIntegration from "../components/StudyPlanner/CalendarIntegration";
import PomodoroTimer from "../components/StudyPlanner/PomodoroTimer";
import TaskProgressTracker from "../components/StudyPlanner/TaskProgressTracker";
import NotificationsAndReminders from "../components/StudyPlanner/NotificationsAndReminders";
import AnalyticsAndInsights from "../components/StudyPlanner/AnalyticsAndInsights";
import MotivationalSection from "../components/StudyPlanner/MotivationalSection";
import CustomizableSettings from "../components/StudyPlanner/CustomizableSettings";
import DailyWeeklyOverview from "../components/StudyPlanner/DailyWeeklyOverview";
import Settings from "../components/StudyPlanner/Settings";
import SyncAcrossDevices from "../components/StudyPlanner/SyncAcrossDevices";

const StudyPlanner = () => {
  // ----------------------------
  // Sample Static Data
  // ----------------------------
  const sampleTasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      subject: 'History',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'High',
      status: 'Completed',
      timeEstimate: 120,
      completion: 100,
      timeSpent: 60,
      completionDate: new Date().toISOString().split('T')[0],
    },
    {
      id: '2',
      name: 'Math Homework',
      subject: 'Math',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: 'Medium',
      status: 'Pending',
      timeEstimate: 60,
      completion: 50,
      timeSpent: 30,
    },
  ];

  const sampleSettings = {
    timeZone: 'UTC',
    notificationSettings: {
      upcomingTasks: true,
      deadlines: true,
      reminders: true,
      method: 'in-app',
    },
  };

  // ----------------------------
  // Event Handlers
  // ----------------------------
  const handleTimeTracked = (taskName, timeSpent) => {
    console.log(`Tracked ${timeSpent} minutes for task: ${taskName}`);
  };

  const handleProgressUpdate = (updatedTasks) => {
    console.log('Progress updated:', updatedTasks);
  };

  const handleReminderSet = (reminder) => {
    console.log('Reminder set:', reminder);
  };

  const handleViewChange = (view) => {
    console.log('View changed to:', view);
  };

  const handleThemeChange = (theme) => {
    console.log('Theme changed to:', theme);
  };

  const handleCategoryAdd = (category) => {
    console.log('Category added:', category);
  };

  const handleTimeZoneChange = (timeZone) => {
    console.log('Time zone changed to:', timeZone);
  };

  const handleNotificationSettingsChange = (settings) => {
    console.log('Notification settings changed:', settings);
  };

  const handleSync = (syncData) => {
    console.log('Data synced:', syncData);
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="study-planner-wrapper">
      {/* Sidebar */}
      <div className="study-planner-sidebar">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header */}
        <div className="navbar">
          <Header />
        </div>

        {/* Planner Sections */}
        <OverviewSection userName="John" />
        <StudyTaskList initialTasks={sampleTasks} />
        <CalendarIntegration initialTasks={sampleTasks} />
        <PomodoroTimer tasks={sampleTasks} onTimeTracked={handleTimeTracked} />
        <TaskProgressTracker tasks={sampleTasks} onProgressUpdate={handleProgressUpdate} />
        <NotificationsAndReminders tasks={sampleTasks} onReminderSet={handleReminderSet} />
        <AnalyticsAndInsights tasks={sampleTasks} />
        <MotivationalSection tasks={sampleTasks} completedThreshold={2} />
        <CustomizableSettings
          onViewChange={handleViewChange}
          onThemeChange={handleThemeChange}
          onCategoryAdd={handleCategoryAdd}
        />
        <DailyWeeklyOverview tasks={sampleTasks} />
        <Settings
          onTimeZoneChange={handleTimeZoneChange}
          onNotificationSettingsChange={handleNotificationSettingsChange}
        />
        <SyncAcrossDevices
          tasks={sampleTasks}
          settings={sampleSettings}
          onSync={handleSync}
        />
      </div>
    </div>
  );
};

export default StudyPlanner;
