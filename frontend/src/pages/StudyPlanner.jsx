// frontend/src/pages/StudyPlanner.jsx
import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks.jsx';
import { useAuth } from '../components/auth/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import taskServices from '../services/taskServices.js';
import SideBar from '../components/Home/SideBar.jsx';
import OverviewSection from '../components/StudyPlanner/StudyPlannerOverview.jsx';
import StudyTaskList from '../components/StudyPlanner/StudyTaskList.jsx';
import TaskFiltersAndSorting from '../components/StudyPlanner/TaskFiltersAndSorting.jsx';
import CalendarIntegration from '../components/StudyPlanner/CalendarIntegration.jsx';
import PomodoroTimer from '../components/StudyPlanner/PomodoroTimer.jsx';
import TaskProgressTracker from '../components/StudyPlanner/TaskProgressTracker.jsx';
import NotificationsAndReminders from '../components/StudyPlanner/NotificationsAndReminders.jsx';
import AnalyticsAndInsights from '../components/StudyPlanner/AnalyticsAndInsights.jsx';
import ChartSection from '../components/StudyPlanner/ChartSection.jsx';
import MotivationalSection from '../components/StudyPlanner/MotivationalSection.jsx';
import CustomizableSettings from '../components/StudyPlanner/CustomizableSettings.jsx';
import DailyWeeklyOverview from '../components/StudyPlanner/DailyWeeklyOverview.jsx';
import Settings from '../components/StudyPlanner/Settings.jsx';
import SyncAcrossDevices from '../components/StudyPlanner/SyncAcrossDevices.jsx';

const StudyPlanner = () => {
  const { user, logout } = useAuth();
  const { tasks, setTasks, loading, error } = useTasks(user?.id);
  const navigate = useNavigate();
  const [calendarView, setCalendarView] = useState('month');
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({
    timeZone: 'UTC',
    notificationSettings: { upcomingTasks: true, deadlines: true, reminders: true, method: 'in-app' },
  });

  // Map tasks to match component prop expectations (id, name)
  const mappedTasks = tasks.map((task) => ({
    ...task,
    id: task._id,
    name: task.title,
    status: task.status === 'Pending' ? 'In Progress' : task.status,
  }));

  // Guard against missing user
  useEffect(() => {
    if (!user?.id) {
      toast.error('Please log in to access the study planner.');
      navigate('/login');
      return;
    }

    taskServices.getSettings(user.id)
      .then((response) => setSettings(response))
      .catch((err) => {
        console.error('Failed to fetch settings:', err);
        if (err.message === 'Session expired. Please log in again.') {
          logout();
          navigate('/login');
        }
        toast.error(err.message || 'Failed to load settings.');
      });
  }, [user, logout, navigate]);

  const handleAddTask = async (taskData) => {
    try {
      if (!user?.id) throw new Error('User ID not available');
      const normalizedTaskData = {
        ...taskData,
        status: taskData.status === 'In Progress' ? 'Pending' : taskData.status,
      };
      console.log('Adding task with data:', normalizedTaskData);
      const newTask = await taskServices.addTask(normalizedTaskData);
      console.log('New task added:', newTask);
      const updatedTasks = await taskServices.fetchTasks();
      setTasks(updatedTasks);
      toast.success('Task added successfully!');
    } catch (err) {
      console.error('Failed to add task:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to add task.');
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      console.log('Updating task:', taskId, updatedData);
      const normalizedData = {
        ...updatedData,
        status: updatedData.status === 'In Progress' ? 'Pending' : updatedData.status,
      };
      const updatedTask = await taskServices.updateTask(taskId, normalizedData);
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Failed to update task:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      console.log('Deleting task:', taskId);
      await taskServices.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Failed to delete task:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to delete task.');
    }
  };

  const handleRescheduleTask = async (taskId, newDate) => {
    try {
      console.log('Rescheduling task:', taskId, newDate);
      const updatedTask = await taskServices.updateTask(taskId, { dueDate: newDate });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      toast.success('Task rescheduled successfully!');
    } catch (err) {
      console.error('Failed to reschedule task:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to reschedule task.');
    }
  };

  const handleTimeTracked = async (taskId, timeSpent) => {
    try {
      console.log('Tracking time for task:', taskId, timeSpent);
      const updatedTask = await taskServices.updateTask(taskId, { timeSpent });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      toast.success('Time tracked successfully!');
    } catch (err) {
      console.error('Failed to update time spent:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to update time spent.');
    }
  };

  const handleProgressUpdate = async (taskId, completion) => {
    try {
      console.log('Updating progress for task:', taskId, completion);
      const updatedTask = await taskServices.updateTask(taskId, { completion });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      toast.success('Progress updated successfully!');
    } catch (err) {
      console.error('Failed to update progress:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to update progress.');
    }
  };

  const handleReminderSet = async (reminder) => {
    try {
      console.log('Setting reminder:', reminder);
      await taskServices.setReminder(user.id, reminder);
      toast.success('Reminder set successfully!');
    } catch (err) {
      console.error('Failed to set reminder:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to set reminder.');
    }
  };

  const handleFilterAndSort = async (filteredTasks) => {
    try {
      console.log('Applying filter and sort:', filteredTasks);
      setTasks(filteredTasks.map((task) => ({
        ...task,
        _id: task.id,
        title: task.name,
        status: task.status === 'In Progress' ? 'Pending' : task.status,
      })));
      toast.success('Tasks filtered and sorted successfully!');
    } catch (err) {
      console.error('Failed to filter and sort tasks:', err.message, err.stack);
      toast.error(err.message || 'Failed to filter and sort tasks.');
    }
  };

  const handleViewChange = (view) => {
    setCalendarView(view);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleCategoryAdd = async (category) => {
    try {
      console.log('Adding category:', category);
      await taskServices.addCategory(user.id, category);
      toast.success('Category added successfully!');
    } catch (err) {
      console.error('Failed to add category:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to add category.');
    }
  };

  const handleTimeZoneChange = async (timeZone) => {
    try {
      console.log('Updating time zone:', timeZone);
      const updatedSettings = { ...settings, timeZone };
      await taskServices.updateSettings(user.id, updatedSettings);
      setSettings(updatedSettings);
      toast.success('Time zone updated successfully!');
    } catch (err) {
      console.error('Failed to update time zone:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to update time zone.');
    }
  };

  const handleNotificationSettingsChange = async (notificationSettings) => {
    try {
      console.log('Updating notification settings:', notificationSettings);
      const updatedSettings = { ...settings, notificationSettings };
      await taskServices.updateSettings(user.id, updatedSettings);
      setSettings(updatedSettings);
      toast.success('Notification settings updated successfully!');
    } catch (err) {
      console.error('Failed to update notification settings:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to update notification settings.');
    }
  };

  const handleSync = async (syncData) => {
    try {
      console.log('Syncing data:', syncData);
      await taskServices.syncData(user.id, syncData);
      toast.success('Data synced successfully!');
    } catch (err) {
      console.error('Failed to sync data:', err.message, err.stack);
      if (err.message === 'Session expired. Please log in again.') {
        logout();
        navigate('/login');
      }
      toast.error(err.message || 'Failed to sync data.');
    }
  };

  // Guard against rendering if user is not authenticated
  if (!user?.id) {
    return null; // Will be redirected by useEffect
  }

  // Show loading or error state
  if (loading) {
    return (
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <ToastContainer position="top-right" />
        <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-10 overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex-1 ml-64 p-6">
          <div className="container mx-auto">
            <p className="text-center text-gray-500">Loading tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !Array.isArray(tasks)) {
    return (
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <ToastContainer position="top-right" />
        <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-10 overflow-y-auto">
          <SideBar />
        </div>
        <div className="flex-1 ml-64 p-6">
          <div className="container mx-auto">
            <p className="text-center text-red-500">{error || 'Failed to load tasks. Please try again.'}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate ChartSection props
  const totalCompletion = tasks.reduce((sum, task) => sum + (task.completion || 0), 0);
  const progress = tasks.length > 0 ? Math.round(totalCompletion / tasks.length) : 0;
  const timeData = [
    tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0), // Learning
    0, // Skill Development (placeholder)
    tasks.length * 10, // Study Planner (placeholder)
  ];

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <ToastContainer position="top-right" />
      <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-10 overflow-y-auto">
        <SideBar />
      </div>
      <div className="flex-1 ml-64 p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Filters & Sorting</h2>
                <TaskFiltersAndSorting tasks={mappedTasks} onFilterAndSort={handleFilterAndSort} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <CustomizableSettings
                  onViewChange={handleViewChange}
                  onThemeChange={handleThemeChange}
                  onCategoryAdd={handleCategoryAdd}
                  currentTheme={theme}
                  currentView={calendarView}
                />
                <Settings
                  settings={settings}
                  onTimeZoneChange={handleTimeZoneChange}
                  onNotificationSettingsChange={handleNotificationSettingsChange}
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <OverviewSection
                  userName={user?.name || 'User'}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Task List</h2>
                <StudyTaskList
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Task Calendar</h2>
                <CalendarIntegration
                  initialTasks={mappedTasks}
                  view={calendarView}
                  onRescheduleTask={handleRescheduleTask}
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
                <AnalyticsAndInsights tasks={tasks} />
                <ChartSection progress={progress} timeData={timeData} />
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Daily/Weekly Overview</h2>
                <DailyWeeklyOverview tasks={mappedTasks} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>
                <PomodoroTimer tasks={mappedTasks} onTimeTracked={handleTimeTracked} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
                <TaskProgressTracker tasks={mappedTasks} onProgressUpdate={handleProgressUpdate} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <NotificationsAndReminders tasks={mappedTasks} onReminderSet={handleReminderSet} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Motivational Section</h2>
                <MotivationalSection tasks={mappedTasks} completedThreshold={2} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Sync Across Devices</h2>
                <SyncAcrossDevices tasks={mappedTasks} settings={settings} onSync={handleSync} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Collaboration (Coming Soon)</h2>
                <p>Group study tasks and shared calendars will be available in a future update.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;