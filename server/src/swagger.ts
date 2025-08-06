import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kanban API',
      version: '1.0.0',
      description: 'API for managing tasks in Kanban board',
    },
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
