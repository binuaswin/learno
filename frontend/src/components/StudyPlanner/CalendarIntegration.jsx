// frontend/src/components/StudyPlanner/CalendarIntegration.jsx
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import './CalendarIntegration.css';

const CalendarIntegration = ({ tasks = [], view, onRescheduleTask }) => {
  const [currentView, setCurrentView] = useState(view);

  if (!Array.isArray(tasks)) {
    return <div className="calendar"><p className="error">Unable to load calendar. Please try again.</p></div>;
  }

  const generateMonthDays = () => {
    const daysInMonth = 28; // February 2025 (simplified)
    const monthStart = new Date('2025-02-01');
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(monthStart);
      date.setDate(monthStart.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const monthDays = generateMonthDays();
  const today = '2025-02-15';

  const getTasksForDay = (day) => tasks.filter((task) => task.dueDate === day);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const task = tasks[source.index];
    const newDueDate = destination.droppableId;
    onRescheduleTask(task.id, newDueDate);
  };

  return (
    <div className="calendar">
      <h3>Your Schedule</h3>
      <div className="view-toggle">
        <button
          className={`toggle-button ${currentView === 'month' ? 'active' : ''}`}
          onClick={() => setCurrentView('month')}
        >
          Month View
        </button>
        <button
          className={`toggle-button ${currentView === 'day' ? 'active' : ''}`}
          onClick={() => setCurrentView('day')}
        >
          Day View
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {currentView === 'month' ? (
          <div className="days">
            {monthDays.map((day) => (
              <Droppable key={day} droppableId={day}>
                {(provided) => (
                  <div className="day" ref={provided.innerRef} {...provided.droppableProps}>
                    <span>{new Date(day).getDate()}</span>
                    {getTasksForDay(day).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className={`task-card ${
                              task.status === 'Completed'
                                ? 'completed'
                                : new Date(task.dueDate) < new Date(today)
                                ? 'overdue'
                                : 'upcoming'
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        ) : (
          <div className="day-view">
            <Droppable droppableId={today}>
              {(provided) => (
                <div className="day" ref={provided.innerRef} {...provided.droppableProps}>
                  <span>{new Date(today).toLocaleDateString()}</span>
                  {getTasksForDay(today).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          className={`task-card ${
                            task.status === 'Completed'
                              ? 'completed'
                              : new Date(task.dueDate) < new Date(today)
                              ? 'overdue'
                              : 'upcoming'
                            }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </DragDropContext>
    </div>
  );
};

CalendarIntegration.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['In Progress', 'Completed', 'Overdue']).isRequired,
    })
  ).isRequired,
  view: PropTypes.oneOf(['month', 'day']).isRequired,
  onRescheduleTask: PropTypes.func.isRequired,
};

export default CalendarIntegration;