import { useEffect, useState } from 'react';
import axios from 'axios';
import Column from '../components/Column';
import NewTaskForm from '../components/NewTaskForm';
import EditTaskModal from '../components/EditTaskModal';
import type { Task } from '../types/Task';
import {
  DndContext,
  closestCorners,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

 const fetchTasks = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`);
  setTasks(res.data);
};

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const newStatus = over.id as Task['status'];
    const task = tasks.find((t) => t.id === active.id);
    if (!task || task.status === newStatus) return;

    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`, {
  ...task,
  status: newStatus,
});

    fetchTasks();
  };

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === 'todo'),
    'in-progress': tasks.filter((t) => t.status === 'in-progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
  <div className="flex flex-col gap-10 items-center">
    <NewTaskForm onTaskCreated={fetchTasks} />

    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {(['todo', 'in-progress', 'done'] as Task['status'][]).map((status) => (
          <Column
            key={status}
            id={status}
            title={status.replace('-', ' ').toUpperCase()}
            tasks={groupedTasks[status]}
            onDelete={handleDelete}
            onEdit={(task) => setEditTask(task)}
          />
        ))}
      </div>
    </DndContext>

    <EditTaskModal
      task={editTask}
      onClose={() => setEditTask(null)}
      onUpdated={fetchTasks}
    />
  </div>
</div>

  );
};

export default KanbanBoard;
