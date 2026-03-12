import React, { useState } from 'react';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import taskService from '../services/taskService';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [loading, setLoading] = useState(false);
  const isCompleted = task.status === 'Completed';

  const handleToggle = async () => {
    setLoading(true);
    try {
      const newStatus = isCompleted ? 'Pending' : 'Completed';
      const updatedTask = await taskService.updateTaskStatus(task._id, newStatus);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await taskService.deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={`p-4 rounded-lg border shadow-sm transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isCompleted ? 'bg-slate-50 border-slate-200' : 'bg-white border-indigo-100 hover:border-indigo-300'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex-shrink-0 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            aria-label={isCompleted ? 'Mark pending' : 'Mark completed'}
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 text-emerald-500 hover:text-emerald-600" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-slate-300 hover:border-indigo-500"></div>
            )}
          </button>
          <div className="min-w-0">
            <h4 className={`text-lg font-semibold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
              {task.title}
            </h4>
          </div>
        </div>
        
        {task.description && (
          <p className={`mt-2 text-sm pl-9 break-words ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
            {task.description}
          </p>
        )}
        
        <div className="mt-3 pl-9 flex items-center text-xs space-x-4">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
            {task.status}
          </span>
          <span className="text-slate-400">Created: {formattedDate}</span>
        </div>
      </div>
      
      <div className="flex-shrink-0 pl-9 sm:pl-0 flex items-center justify-end w-full sm:w-auto">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 focus:outline-none transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
