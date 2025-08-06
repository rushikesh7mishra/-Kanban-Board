import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskCard from '../components/TaskCard';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const task = {
  id: '1',
  title: 'Test Task',
  description: 'Task description',
  status: 'todo',
  createdAt: new Date(),
};

describe('TaskCard', () => {
  it('renders task title and description', () => {
    render(<TaskCard task={task} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByText(/task description/i)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<TaskCard task={task} onDelete={() => {}} onEdit={onEdit} />);

    fireEvent.click(screen.getByTitle(/edit/i));
    expect(onEdit).toHaveBeenCalledWith(task);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    (axios.delete as vi.Mock).mockResolvedValue({});

    render(<TaskCard task={task} onDelete={onDelete} onEdit={() => {}} />);

    fireEvent.click(screen.getByTitle(/delete/i));

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith('1');
    });
  });
});
