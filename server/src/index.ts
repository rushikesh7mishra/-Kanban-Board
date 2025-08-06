import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { swaggerSpec } from './swagger';

const app = express();
const PORT = 5050;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;
