import React, { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
  task: Task | null;
  onClose: () => void;
  onUpdated: () => void;
}

const EditTaskModal = ({ task, onClose, onUpdated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
    }
  }, [task?.id]);

  if (!task) return null;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
   await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`, {
  title,
  description,
  status: task.status,
});

    toast.success('Task updated');
    onUpdated();
    onClose();
  } catch {
    toast.error('Update failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[300px]">
        <h2 className="text-lg font-semibold mb-3">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-sm">
              Cancel
            </button>
            <button
  type="submit"
  disabled={loading}
  className={`bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ${
    loading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {loading ? 'Saving...' : 'Save'}
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
