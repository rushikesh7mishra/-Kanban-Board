import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
  onTaskCreated: () => void;
}

const NewTaskForm = ({ onTaskCreated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
  title,
  description,
  status: 'todo',
});


    toast.success('Task created');
    setTitle('');
    setDescription('');
    onTaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-6 rounded-xl bg-white/50 backdrop-blur-md shadow-md border border-gray-200 space-y-4 w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Create New Task</h2>

      <input
        type="text"
        placeholder="Enter task title"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Enter task description (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="text-right">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition duration-200"
        >
          ➕ Add Task
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
