import { render, screen, fireEvent } from '@testing-library/react';
import NewTaskForm from '../components/NewTaskForm';
import axios from 'axios';

vi.mock('axios');

describe('NewTaskForm', () => {
  it('renders title input', () => {
    render(<NewTaskForm onTaskCreated={() => {}} />);
    const input = screen.getByPlaceholderText(/enter task title/i);
    expect(input).toBeInTheDocument();
  });

  it('renders description input', () => {
    render(<NewTaskForm onTaskCreated={() => {}} />);
    const textarea = screen.getByPlaceholderText(/enter task description/i);
    expect(textarea).toBeInTheDocument();
  });

  it('submits with valid input', async () => {
    const mockFn = vi.fn();
    render(<NewTaskForm onTaskCreated={mockFn} />);

    fireEvent.change(screen.getByPlaceholderText(/enter task title/i), {
      target: { value: 'Test Task' },
    });

    (axios.post as vi.Mock).mockResolvedValue({ data: {} });

    fireEvent.click(screen.getByText(/add task/i));

    await screen.findByText(/add task/i);
    expect(mockFn).toHaveBeenCalled();
  });
});
