import { BookOpen, PlusCircle, TrendingUp, Bell } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <button className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center shadow-md hover:bg-green-600">
        <BookOpen className="mr-2" /> Start Learning
      </button>
      <button className="bg-yellow-500 text-white p-4 rounded-lg flex items-center justify-center shadow-md hover:bg-yellow-600">
        <PlusCircle className="mr-2" /> Add Task
      </button>
      <button className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center shadow-md hover:bg-blue-600">
        <TrendingUp className="mr-2" /> Track Skill
      </button>
      <button className="bg-red-500 text-white p-4 rounded-lg flex items-center justify-center shadow-md hover:bg-red-600">
        <Bell className="mr-2" /> Notifications
      </button>
    </div>
  );
};

export default QuickActions;
