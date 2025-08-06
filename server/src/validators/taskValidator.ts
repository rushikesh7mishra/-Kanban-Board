import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
});

export type TaskInput = z.infer<typeof taskSchema>;
