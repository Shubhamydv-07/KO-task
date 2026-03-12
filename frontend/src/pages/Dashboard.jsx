import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import taskService from '../services/taskService';
import { Filter } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks(filter);
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      
      // If we are showing 'Completed' tasks, don't show the newly added 'Pending' task
      if (filter === 'Completed') {
        return;
      }
      
      // Otherwise, add it to the top of the list
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Failed to add task.');
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) => {
      // If the filter is no longer applicable to the updated task, remove it from view
      if (filter !== 'All' && updatedTask.status !== filter) {
        return prevTasks.filter((t) => t._id !== updatedTask._id);
      }
      
      // Otherwise, update it in place
      return prevTasks.map((t) => 
        t._id === updatedTask._id ? updatedTask : t
      );
    });
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Tasks</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your daily goals and objectives.</p>
        </header>

        {error && (
             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md shadow-sm">
                <p className="text-sm text-red-700">{error}</p>
             </div>
        )}

        <TaskForm onTaskAdded={handleTaskAdded} />

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Task List
              {!loading && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {tasks.length}
                </span>
              )}
            </h3>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {['All', 'Pending', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      filter === tab
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onTaskUpdated={handleTaskUpdated} 
              onTaskDeleted={handleTaskDeleted} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
