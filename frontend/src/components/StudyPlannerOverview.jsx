import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudyPlannerOverview = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    deadline: '',
    priority: 'Medium',
    status: 'Pending',
  });
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view tasks');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
        setError('');
      } catch (err) {
        console.error('Fetch tasks error:', err);
        setError(err.response?.data?.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) {
      setError('Title and deadline are required.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        { task_id: Date.now().toString(), ...newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data.task]);
      setNewTask({ title: '', deadline: '', priority: 'Medium', status: 'Pending' });
      setError('');
    } catch (err) {
      console.error('Add task error:', err);
      setError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
    });
  };

  // Update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.deadline) {
      setError('Title and deadline are required.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask.task_id}`,
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t.task_id === editingTask.task_id ? res.data.task : t)));
      setEditingTask(null);
      setNewTask({ title: '', deadline: '', priority: 'Medium', status: 'Pending' });
      setError('');
    } catch (err) {
      console.error('Update task error:', err);
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (task_id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${task_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.task_id !== task_id));
      setError('');
    } catch (err) {
      console.error('Delete task error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  // Task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const overdueTasks = tasks.filter((t) => t.status === 'Overdue').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  // Chart data
  const chartData = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444'],
        borderColor: ['#059669', '#2563EB', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Task Status Distribution' },
    },
  };

  return (
    <div className='bg-white shadow-lg rounded-xl p-6 mb-6 max-w-3xl mx-auto'>
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>Study Planner Overview</h3>
      {error && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
      {loading && <p className='text-gray-500 mb-4'>Loading...</p>}

      {/* Task Form */}
      <div className='mb-8'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h4>
        <form
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          <input
            type='text'
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder='Task Title'
            className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
            disabled={loading}
          />
          <input
            type='date'
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
            disabled={loading}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
            disabled={loading}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className='p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700'
            disabled={loading}
          >
            <option value='Pending'>Pending</option>
            <option value='Completed'>Completed</option>
            <option value='Overdue'>Overdue</option>
          </select>
          <button
            type='submit'
            className='col-span-1 md:col-span-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-green-400'
            disabled={loading}
          >
            <Plus size={18} /> {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
        {editingTask && (
          <button
            onClick={() => {
              setEditingTask(null);
              setNewTask({ title: '', deadline: '', priority: 'Medium', status: 'Pending' });
            }}
            className='mt-2 text-sm text-gray-600 hover:text-gray-800'
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className='mb-8'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>Tasks</h4>
        {tasks.length > 0 ? (
          <ul className='space-y-3'>
            {tasks.map((task) => (
              <li
                key={task.task_id}
                className='p-4 bg-gray-50 rounded-lg flex justify-between items-center'
              >
                <div>
                  <span className='font-medium text-gray-800'>{task.title}</span>
                  <p className='text-sm text-gray-600'>
                    Deadline: {task.deadline}{' '}
                    {task.status === 'Overdue' && (
                      <span className='text-red-500'>(Overdue)</span>
                    )}
                    {task.status === 'Completed' && (
                      <span className='text-green-500'>(Completed)</span>
                    )}
                  </p>
                  <p className='text-sm text-gray-600'>Priority: {task.priority}</p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEditTask(task)}
                    className='text-blue-600 hover:text-blue-800 disabled:text-blue-400'
                    disabled={loading}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.task_id)}
                    className='text-red-600 hover:text-red-800 disabled:text-red-400'
                    disabled={loading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-gray-600'>No tasks yet.</p>
        )}
      </div>

      {/* Task Stats */}
      <div className='mb-8'>
        <h4 className='text-lg font-semibold text-gray-700 mb-3'>Task Stats</h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          <div className='p-4 bg-blue-50 rounded-lg text-center'>
            <p className='text-2xl font-bold text-blue-600'>{totalTasks}</p>
            <p className='text-sm text-gray-600'>Total Tasks</p>
          </div>
          <div className='p-4 bg-green-50 rounded-lg text-center'>
            <p className='text-2xl font-bold text-green-600'>{completedTasks}</p>
            <p className='text-sm text-gray-600'>Completed</p>
          </div>
          <div className='p-4 bg-red-50 rounded-lg text-center'>
            <p className='text-2xl font-bold text-red-600'>{overdueTasks}</p>
            <p className='text-sm text-gray-600'>Overdue</p>
          </div>
        </div>
        <div className='p-4 bg-gray-50 rounded-lg'>
          <p className='text-lg font-semibold text-gray-800 mb-2'>
            Completion Rate: {completionRate}%
          </p>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StudyPlannerOverview;