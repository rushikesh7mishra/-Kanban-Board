import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Task } from '../types/Task';
import { Trash, Pencil, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onDelete, onEdit }: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`);

      onDelete(task.id);
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow relative flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="cursor-grab text-gray-400 hover:text-gray-600"
          title="Drag"
        >
          <GripVertical size={16} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`${
              deleting ? 'opacity-50 cursor-not-allowed' : 'text-red-500 hover:text-red-700'
            }`}
            title="Delete"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>

      {task.description && (
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
