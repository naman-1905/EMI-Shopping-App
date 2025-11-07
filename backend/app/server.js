import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import categoryRouter from './apis/Category/api.js';

const app = express();
const port = 5000;

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EMI Shopping App API',
      version: '1.0.0',
      description: 'Backend API for EMI Shopping Application',
    },
  },
  apis: ['./server.js', './apis/**/*.js'], // files to scan for annotations
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example endpoint
/**
 * @openapi
 * /:
 *   get:
 *     summary: Returns a simple greeting
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Category API routes
app.use('/api/category', categoryRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
});
