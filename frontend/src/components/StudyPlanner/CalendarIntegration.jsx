import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const CalendarIntegration = ({
  initialTasks = [
    {
      id: '1',
      name: 'Study for History Exam',
      subject: 'History',
      dueDate: '2025-02-15',
      status: 'Pending',
    },
  ],
  onTaskUpdate = () => {},
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('month'); // 'day' or 'month'

  // Generate calendar days for the current month (simplified for Feb 2025)
  const generateMonthDays = () => {
    const daysInMonth = 28; // February 2025 (simplified)
    const monthStart = new Date('2025-02-01');
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(monthStart);
      date.setDate(monthStart.getDate() + i);
      days.push(date.toISOString().split('T')[0]); // e.g., '2025-02-01'
    }
    return days;
  };

  const monthDays = generateMonthDays();
  const today = '2025-02-15'; // Example current date for demo

  // Filter tasks for a specific day (for day view)
  const getTasksForDay = (day) => tasks.filter((task) => task.dueDate === day);

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.dueDate = destination.droppableId; // Update due date to new day
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
    onTaskUpdate(updatedTasks); // Notify parent of updated tasks
  };

  return (
    <div className="calendar">
      <h3>Your Schedule</h3>
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === 'month' ? 'active' : ''}`}
          onClick={() => setView('month')}
        >
          Month View
        </button>
        <button
          className={`toggle-button ${view === 'day' ? 'active' : ''}`}
          onClick={() => setView('day')}
        >
          Day View
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {view === 'month' ? (
          <div className="days">
            {monthDays.map((day) => (
              <Droppable key={day} droppableId={day}>
                {(provided) => (
                  <div
                    className="day"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
                <div
                  className="day"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Completed']).isRequired,
    })
  ),
  onTaskUpdate: PropTypes.func,
};

export default CalendarIntegration;