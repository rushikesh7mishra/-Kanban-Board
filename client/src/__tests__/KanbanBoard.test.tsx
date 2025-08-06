import { render, screen, waitFor } from '@testing-library/react';
import KanbanBoard from '../pages/KanbanBoard';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('KanbanBoard', () => {
  it('renders all columns and form', async () => {
    (axios.get as vi.Mock).mockResolvedValue({
      data: [
        { id: '1', title: 'Task 1', status: 'todo', createdAt: new Date() },
        { id: '2', title: 'Task 2', status: 'in-progress', createdAt: new Date() },
        { id: '3', title: 'Task 3', status: 'done', createdAt: new Date() },
      ],
    });

    render(<KanbanBoard />);

    await waitFor(() => {
      expect(screen.getByText(/todo/i)).toBeInTheDocument();
      expect(screen.getByText(/in progress/i)).toBeInTheDocument();
      expect(screen.getByText(/done/i)).toBeInTheDocument();

      expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/task 3/i)).toBeInTheDocument();
  });
});
