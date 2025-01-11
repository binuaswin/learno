import  { useState } from "react";
import "./StudyPlanner.css";

const StudyPlanner = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [taskInput, setTaskInput] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    if (!taskInput || !selectedDate) return;

    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDate]: [...(prevTasks[selectedDate] || []), taskInput],
    }));
    setTaskInput("");
  };

  return (
    <div className="study-planner-container">
      <h1>Study Planner</h1>
      <div className="calendar">
        {Array.from({ length: 30 }, (_, i) => {
          const date = `2025-01-${String(i + 1).padStart(2, "0")}`;
          return (
            <div
              key={date}
              className={`calendar-date ${
                selectedDate === date ? "selected" : ""
              }`}
              onClick={() => handleDateClick(date)}
            >
              <span>{i + 1}</span>
              <div className="tasks">
                {(tasks[date] || []).map((task, idx) => (
                  <p key={idx}>{task}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="task-form">
        <h2>Add Task</h2>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default StudyPlanner;
