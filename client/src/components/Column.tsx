import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import type { Task } from '../types/Task';

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const Column = ({ id, title, tasks, onDelete, onEdit }: Props) => {
  const { setNodeRef } = useDroppable({ id });

  return (
   <div
  ref={setNodeRef}
  className="bg-white rounded-xl shadow-md border border-gray-200 w-full sm:w-80 min-h-[400px] flex flex-col p-4 transition-all hover:shadow-lg"
>
  <div className="mb-4">
    <h2 className="text-lg font-bold uppercase tracking-wide text-gray-700">
      {title}
    </h2>
    <div className="h-1 w-10 bg-blue-500 mt-1 rounded"></div>
  </div>

  <div className="flex-1 space-y-3 overflow-y-auto">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
    ))}
    {tasks.length === 0 && (
      <div className="text-sm text-gray-400 text-center mt-6">No tasks</div>
    )}
  </div>
</div>

  );
};

export default Column;
