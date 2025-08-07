import KanbanBoard from './pages/KanbanBoard';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        🧩 Kanban Board
      </h1>
      <KanbanBoard />
      <Toaster position="top-center" />
    </div>
  );
}
