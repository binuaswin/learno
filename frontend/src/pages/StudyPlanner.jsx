//import React from 'react';
import { Bell, CheckCircle, Edit, Trash, PlusCircle } from 'lucide-react';
//import { Link } from 'react-router-dom';
import Sidebar from "../components/Home/SideBar"; // Sidebar from Home Page
import Header from "../components/Home/Header"; // Header from Home Page

const StudyPlanner = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <Header />
          <div className="flex items-center space-x-4">
            <Bell size={20} />
            {/* You can add user profile or other navbar items here */}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p className="text-lg text-gray-700">
            Welcome to your Study Planner! Here you can organize your study tasks, track progress, and stay on top of deadlines.
          </p>
        </div>

        {/* Task List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Filter</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full">Sort</button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
                <PlusCircle size={20} className="mr-2" />
                Add Task
              </button>
            </div>

            {/* Task Items */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">Study for History Exam</p>
                  <p className="text-sm text-gray-600">Subject: History | Due Date: 02/15/2025 | Priority: High</p>
                </div>
                <div className="flex space-x-2">
                  <CheckCircle size={20} className="text-green-500 cursor-pointer" />
                  <Edit size={20} className="text-yellow-500 cursor-pointer" />
                  <Trash size={20} className="text-red-500 cursor-pointer" />
                </div>
              </div>
              {/* Add more tasks here */}
            </div>
          </div>
        </div>

        {/* Pomodoro Timer Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Pomodoro Timer</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-700">Focus Time: 25 minutes</p>
              <p className="text-sm text-gray-600">Break Time: 5 minutes</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Start Timer
            </button>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Schedule</h3>
          <div className="grid grid-cols-7 gap-4">
            {/* Calendar UI - Display tasks on respective days */}
            <div className="p-4 bg-gray-200 rounded-lg">Mon</div>
            <div className="p-4 bg-gray-200 rounded-lg">Tue</div>
            <div className="p-4 bg-gray-200 rounded-lg">Wed</div>
            <div className="p-4 bg-gray-200 rounded-lg">Thu</div>
            <div className="p-4 bg-gray-200 rounded-lg">Fri</div>
            <div className="p-4 bg-gray-200 rounded-lg">Sat</div>
            <div className="p-4 bg-gray-200 rounded-lg">Sun</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
