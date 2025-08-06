import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditTaskModal from '../components/EditTaskModal';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const mockTask = {
  id: '1',
  title: 'Sample Task',
  description: 'Sample Description',
  status: 'todo',
  createdAt: new Date(),
};

describe('EditTaskModal', () => {
  it('renders with task data', () => {
    render(
      <EditTaskModal task={mockTask} onClose={() => {}} onUpdated={() => {}} />
    );

    expect(screen.getByDisplayValue(/sample task/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/sample description/i)).toBeInTheDocument();
  });

  it('calls onUpdated and onClose after saving', async () => {
    const onUpdated = vi.fn();
    const onClose = vi.fn();

    (axios.put as vi.Mock).mockResolvedValue({ data: {} });

    render(
      <EditTaskModal task={mockTask} onClose={onClose} onUpdated={onUpdated} />
    );

    fireEvent.change(screen.getByDisplayValue(/sample task/i), {
      target: { value: 'Updated Task' },
    });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(onUpdated).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
