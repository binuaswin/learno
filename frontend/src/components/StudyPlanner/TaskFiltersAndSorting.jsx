// frontend/src/components/StudyPlanner/TaskFiltersAndSorting.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import taskServices from '../../services/taskServices.js';
import { toast } from 'react-toastify';

const TaskFiltersAndSorting = ({ tasks = [], onFilterAndSort }) => {
  const [filterSubject, setFilterSubject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  if (!Array.isArray(tasks)) {
    return <div className="filters"><p className="error">Unable to load filters. Please try again.</p></div>;
  }

  const subjects = [...new Set(tasks.map((task) => task.subject))].filter(Boolean);
  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['In Progress', 'Completed', 'Overdue'];

  const applyFiltersAndSort = async () => {
    try {
      let filteredTasks = [...tasks];

      // Apply backend filtering for large datasets
      if (tasks.length > 100) { // Threshold for backend filtering
        const filters = {};
        if (filterSubject) filters.subject = filterSubject;
        if (filterPriority) filters.priority = filterPriority;
        if (filterStatus) filters.status = filterStatus;
        filteredTasks = await taskServices.filterTasks(filters);
      } else {
        // Client-side filtering
        if (filterSubject) {
          filteredTasks = filteredTasks.filter((task) => task.subject === filterSubject);
        }
        if (filterPriority) {
          filteredTasks = filteredTasks.filter((task) => task.priority === filterPriority);
        }
        if (filterStatus) {
          filteredTasks = filteredTasks.filter((task) => task.status === filterStatus);
        }
      }

      // Apply sorting
      if (sortBy) {
        filteredTasks.sort((a, b) => {
          let comparison = 0;
          if (sortBy === 'dueDate') {
            comparison = new Date(a.dueDate) - new Date(b.dueDate);
          } else if (sortBy === 'priority') {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          } else if (sortBy === 'timeEstimate') {
            const timeA = a.timeEstimate ? parseInt(a.timeEstimate) : 0;
            const timeB = b.timeEstimate ? parseInt(b.timeEstimate) : 0;
            comparison = timeA - timeB;
          }
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      }

      onFilterAndSort(filteredTasks);
    } catch (error) {
      console.error('Filter and sort error:', error.message);
      toast.error(error.message || 'Failed to apply filters');
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'subject') setFilterSubject(value);
    if (filterType === 'priority') setFilterPriority(value);
    if (filterType === 'status') setFilterStatus(value);
    applyFiltersAndSort();
  };

  const handleSortChange = (value) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
    applyFiltersAndSort();
  };

  return (
    <div className="filters">
      <div className="filter-buttons">
        <select
          value={filterSubject}
          onChange={(e) => handleFilterChange('subject', e.target.value)}
          className="filter-button"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <select
          value={filterPriority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="filter-button"
        >
          <option value="">All Priorities</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-button"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="sort-button"
      >
        <option value="">Sort By</option>
        <option value="dueDate">Due Date ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</option>
        <option value="priority">Priority ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})</option>
        <option value="timeEstimate">Time Estimate ({sortOrder === 'asc' ? 'Short to Long' : 'Long to Short'})</option>
      </select>
    </div>
  );
};

TaskFiltersAndSorting.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      status: PropTypes.oneOf(['In Progress', 'Completed', 'Overdue']).isRequired,
      dueDate: PropTypes.string.isRequired,
      timeEstimate: PropTypes.number,
    })
  ).isRequired,
  onFilterAndSort: PropTypes.func.isRequired,
};

export default TaskFiltersAndSorting;