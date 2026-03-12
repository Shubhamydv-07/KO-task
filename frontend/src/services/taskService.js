import api from './api';

const taskService = {
  // Get all tasks (Axios automatically attaches the JWT token via interceptors)
  getTasks: async (filter = 'All') => {
    let query = '';
    // Optional backend filtering if implemented, otherwise fetch all and filter in React
    if (filter !== 'All') {
      // API requires 'Pending' or 'Completed'
      query = `?status=${filter}`;
    }
    const response = await api.get(`/tasks${query}`);
    return response.data.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    // taskData: { title, description }
    const response = await api.post('/tasks', taskData);
    return response.data.data;
  },

  // Toggle or update a task status
  updateTaskStatus: async (taskId, newStatus) => {
    // newStatus: 'Pending' or 'Completed'
    const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
    return response.data.data;
  },

  // Delete a task completely
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data; // Usually an empty object { success: true, data: {} }
  }
};

export default taskService;
