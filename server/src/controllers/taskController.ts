import { Request, Response } from 'express';
import { tasks } from '../models/taskModel';
import { ZodError } from 'zod';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';
import { taskSchema } from '../validators/taskValidator';

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const validated = taskSchema.parse(req.body);
    const newTask = {
      id: crypto.randomUUID(),
      ...validated,
      createdAt: new Date(),
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {
    const validated = taskSchema.parse(req.body);
    const taskId = req.params.id;
    const existingTask = tasks.find(t => t.id === taskId);
    if (!existingTask) return res.status(404).json({ error: 'Task not found' });

    Object.assign(existingTask, validated);

    res.json(existingTask);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: err.issues });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
};
