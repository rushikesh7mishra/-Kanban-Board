import axios from 'axios';

const baseURL = 'http://localhost:5050/api/tasks';

describe('Task API', () => {
  it('should create a task', async () => {
    const res = await axios.post(baseURL, {
      title: 'Test Task',
      description: 'Testing...',
      status: 'todo',
    });

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('title', 'Test Task');
    expect(res.data).toHaveProperty('id');
  });

  it('should get all tasks', async () => {
    const res = await axios.get(baseURL);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('should update a task', async () => {
    const createRes = await axios.post(baseURL, {
      title: 'Update Task',
      description: 'To be updated',
      status: 'todo',
    });

    const taskId = createRes.data.id;

    const updateRes = await axios.put(`${baseURL}/${taskId}`, {
      title: 'Updated Title',
      description: 'Updated desc',
      status: 'done',
    });

    expect(updateRes.status).toBe(200);
    expect(updateRes.data.title).toBe('Updated Title');
    expect(updateRes.data.status).toBe('done');
  });

  it('should delete a task', async () => {
    const createRes = await axios.post(baseURL, {
      title: 'Delete Task',
      description: 'To be deleted',
      status: 'in-progress',
    });

    const taskId = createRes.data.id;

    const deleteRes = await axios.delete(`${baseURL}/${taskId}`);
    expect(deleteRes.status).toBe(204);
    const getAll = await axios.get(baseURL);
    const exists = getAll.data.find((t: any) => t.id === taskId);
    expect(exists).toBeUndefined();
  });
});
