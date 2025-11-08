import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import categoryRouter from './apis/Category/api.js';
import featuredRouter from './apis/Featured/api.js';
import bestsellingRouter from './apis/Bestselling/api.js';
import skuRouter from './apis/SKU/api.js';
import searchRouter from './apis/Search/api.js';
import signupRouter from './apis/Signup/api.js';
import loginRouter from './apis/Login/api.js';
import addressRouter from './apis/Address/api.js';
import wishlistRouter from './apis/Wishlist/api.js';
import cartRouter from './apis/Cart/api.js';
import ordersRouter from './apis/Orders/api.js';

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

// Global middleware for parsing JSON
app.use(express.json());

// Allow CORS from any origin (for development / testing).
// This sets permissive headers and handles preflight OPTIONS requests.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // If you need to allow credentials (cookies/authorization headers with credentials),
  // set Access-Control-Allow-Credentials to true and configure the origin accordingly.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EMI Shopping App API',
      version: '1.0.0',
      description: 'Backend API for EMI Shopping Application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./server.js', './apis/**/*.js', './middleware/**/*.js'], // files to scan for annotations
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

// Featured API routes
app.use('/api/featured', featuredRouter);

// BestSelling API routes
app.use('/api/bestselling', bestsellingRouter);

// SKU API routes
app.use('/api/sku', skuRouter);

// Search API routes
app.use('/api/search', searchRouter);

// Signup API routes
app.use('/api/signup', signupRouter);

// Login API routes
app.use('/api/login', loginRouter);

// Address API routes
app.use('/api/address', addressRouter);

// Wishlist API routes
app.use('/api/wishlist', wishlistRouter);

// Cart API routes
app.use('/api/cart', cartRouter);

// Orders API routes
app.use('/api/orders', ordersRouter);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  console.log(`Swagger docs available at http://${host}:${port}/docs`);
});