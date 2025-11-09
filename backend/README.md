# 🏪 EMI Shopping App - Backend API

> A comprehensive Express.js backend for the EMI Shopping Application with Supabase integration, JWT authentication, and RESTful APIs for e-commerce operations.

---

## 📋 Table of Contents

- [🚀 Quick Start](#quick-start)
- [🏗️ Architecture](#architecture)
- [📦 Installation](#installation)
- [⚙️ Environment Setup](#environment-setup)
- [🗄️ Supabase Connection](#supabase-connection)
- [🔌 API Endpoints](#api-endpoints)
- [🔐 Authentication](#authentication)
- [📚 API Documentation](#api-documentation)
- [🛠️ Development](#development)
- [🐳 Docker](#docker)

---

## 🚀 Quick Start

```bash
# Navigate to backend directory
cd backend/app

# Install dependencies
npm install

# Start the server
npm start
```

The API server will be running at `http://localhost:5000`

**Swagger Documentation:** `http://localhost:5000/docs`

---

## 🏗️ Architecture

```
backend/
├── app/
│   ├── apis/                    # API endpoints organized by module
│   │   ├── Address/            # Address management
│   │   ├── Bestselling/        # Best-selling products
│   │   ├── Cart/               # Shopping cart operations
│   │   ├── Category/           # Product categories
│   │   ├── Featured/           # Featured products
│   │   ├── Login/              # User authentication
│   │   ├── Orders/             # Order management
│   │   ├── Search/             # Product search
│   │   ├── Signup/             # User registration
│   │   ├── SKU/                # Product details
│   │   └── Wishlist/           # Wishlist management
│   ├── middleware/             # Custom middleware
│   │   ├── auth_check.js       # JWT token validation
│   │   ├── refresh_check.js    # Refresh token handling
│   │   └── api.js              # Middleware configurations
│   ├── utility/
│   │   └── db.js               # Supabase client initialization
│   ├── server.js               # Main Express server
│   └── package.json            # Dependencies
├── build_stages/               # CI/CD pipeline stages
├── sql/                        # Database schemas
└── Dockerfile
```

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EMI-Shopping-App/backend
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

---

## ⚙️ Environment Setup

### Required Environment Variables

Create a `.env` file in the `backend/app` directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SCHEMA=public

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# Server Configuration (Optional)
PORT=5000
HOST=0.0.0.0
```

### How to Get Supabase Credentials

1. Visit [Supabase](https://supabase.com)
2. Create a new project
3. Go to **Settings → API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_KEY`

---

## 🗄️ Supabase Connection

### Database Connection Flow

```
┌─────────────────┐
│   Client Code   │
│   (API Call)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│    Express Server           │
│  (Backend API Endpoint)     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   /utility/db.js            │
│ (getSupabaseClient)         │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│      Supabase Client Creation           │
│  createClient(SUPABASE_URL, KEY)        │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   Supabase PostgreSQL DB    │
│   (Cloud Hosted Database)   │
└─────────────────────────────┘
```

### Supabase Client Utility

**File:** `app/utility/db.js`

```javascript
// Get a Supabase client instance
getSupabaseClient()

// Run queries with automatic error handling
runQuery(async (supabase) => {
  const { data, error } = await supabase
    .from('table_name')
    .select('*');
  return data;
})
```

### Key Tables in Supabase

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User accounts | uid, email, first_name, last_name, password_hash |
| `user_address` | Delivery addresses | ad_id, uid, state, city, pincode, flat_house |
| `sku_info` | Product information | sku_id, sku_name, category, price, quantity |
| `user_cart` | Shopping cart items | uid, sku_id, added_at |
| `user_wishlist` | Wishlist items | uid, sku_id, added_at |
| `orders` | Order information | order_id, uid, sku_id, status, created_at |

---

## 🔌 API Endpoints

### 📱 Public Endpoints (No Authentication Required)

#### 🏷️ Category Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/category/unique` | Get all unique product categories |
| `GET` | `/api/category/:categoryName` | Get all products in a category |

**Example Request:**
```bash
curl http://localhost:5000/api/category/unique
curl http://localhost:5000/api/category/Electronics
```

**Example Response:**
```json
{
  "success": true,
  "data": ["Electronics", "Clothing", "Home", "Sports"],
  "message": "Categories retrieved successfully"
}
```

---

#### ⭐ Featured Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/featured/categories` | Get featured product categories |
| `GET` | `/api/featured/skus` | Get all featured products |

**Example Request:**
```bash
curl http://localhost:5000/api/featured/skus
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "sku_id": "SKU001",
      "sku_name": "Premium Headphones",
      "price": 4999,
      "product_image_1_url": "https://..."
    }
  ]
}
```

---

#### 🔥 Best-Selling Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bestselling/skus` | Get all best-selling products |

**Example Request:**
```bash
curl http://localhost:5000/api/bestselling/skus
```

---

#### 📦 Product Details
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/sku/info/:skuId` | Get detailed information about a product |

**Example Request:**
```bash
curl http://localhost:5000/api/sku/info/SKU001
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sku_id": "SKU001",
    "sku_name": "Premium Headphones",
    "category": "Electronics",
    "price": 4999,
    "description": "High-quality wireless headphones",
    "emi_plans": [
      { "months": 3, "monthly_amount": 1666 },
      { "months": 6, "monthly_amount": 833 }
    ],
    "product_image_1_url": "https://..."
  }
}
```

---

#### 🔍 Search Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search?query=keyword` | Search products by brand or description |

**Example Request:**
```bash
curl http://localhost:5000/api/search?query=wireless
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "sku_id": "SKU001",
      "sku_name": "Wireless Headphones",
      "price": 4999
    },
    {
      "sku_id": "SKU002",
      "sku_name": "Wireless Speaker",
      "price": 2499
    }
  ]
}
```

---

### 🔐 Authentication Endpoints

#### 📝 User Signup
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/signup` | Register a new user account |

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "uid": "user-uuid-123",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  },
  "authToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "message": "User registered successfully"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

#### 🔑 User Login
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Authenticate user and get tokens |

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "authToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

### 🏠 Address Management (Authenticated)
All address endpoints require a valid JWT token in the `Authorization` header.

#### Get All Addresses
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/address` | Retrieve all user addresses |

**Response:**
```json
{
  "success": true,
  "addresses": [
    {
      "ad_id": "addr-123",
      "state": "California",
      "city": "San Francisco",
      "pincode": "94102",
      "flat_house": "Apt 501",
      "phone_number": "+1-415-555-0123",
      "receivers_name": "John Doe"
    }
  ]
}
```

---

#### Add New Address
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/address` | Add a new delivery address |

**Request Body:**
```json
{
  "state": "California",
  "city": "San Francisco",
  "pincode": "94102",
  "flat_house": "Apt 501",
  "landmark": "Near Golden Gate Bridge",
  "phone_number": "+1-415-555-0123",
  "receivers_name": "John Doe",
  "special_address": "Home"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Address added successfully"
}
```

---

#### Update Address
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/address` | Update an existing address |

**Request Body:**
```json
{
  "ad_id": "addr-123",
  "state": "California",
  "city": "Los Angeles",
  "pincode": "90001",
  "flat_house": "Suite 100",
  "phone_number": "+1-213-555-0123",
  "receivers_name": "John Doe"
}
```

---

#### Delete Address
| Method | Endpoint | Description |
|--------|----------|-------------|
| `DELETE` | `/api/address` | Remove a delivery address |

**Request Body:**
```json
{
  "ad_id": "addr-123"
}
```

---

### 🛒 Shopping Cart (Authenticated)

#### Add Item to Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cart` | Add a product to the shopping cart |

**Request Body:**
```json
{
  "sku_id": "SKU001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart successfully"
}
```

---

#### Get Cart Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Retrieve all items in user's cart |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sku_id": "SKU001",
      "sku_name": "Premium Headphones",
      "price": 4999,
      "quantity": 5
    },
    {
      "sku_id": "SKU002",
      "sku_name": "Wireless Speaker",
      "price": 2499,
      "quantity": 10
    }
  ],
  "message": "Cart items retrieved successfully"
}
```

---

#### Remove Item from Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| `DELETE` | `/api/cart` | Remove a product from the shopping cart |

**Request Body:**
```json
{
  "sku_id": "SKU001"
}
```

---

### ❤️ Wishlist (Authenticated)

#### Add Item to Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/wishlist` | Add a product to the wishlist |

**Request Body:**
```json
{
  "sku_id": "SKU001"
}
```

---

#### Get Wishlist Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist` | Retrieve all wishlist items |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sku_id": "SKU001",
      "sku_name": "Premium Headphones",
      "price": 4999,
      "quantity": 5
    }
  ],
  "message": "Wishlist items retrieved successfully"
}
```

---

#### Remove Item from Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| `DELETE` | `/api/wishlist` | Remove a product from the wishlist |

**Request Body:**
```json
{
  "sku_id": "SKU001"
}
```

---

### 📦 Orders Management (Authenticated)

#### Create Order
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Create a new order |

**Request Body:**
```json
{
  "ad_id": "addr-123",
  "sku_id": "SKU001",
  "ex_delivery_date": "2024-12-25",
  "quantity": 1,
  "final_price": 4999,
  "cash": false,
  "emi": true,
  "planned_month": 6,
  "mutual_fund_emi": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "ORD-123456",
    "uid": "user-uuid-123",
    "sku_id": "SKU001",
    "status": "pending",
    "created_at": "2024-11-09T10:30:00Z"
  },
  "message": "Order created successfully"
}
```

---

#### Get All Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Retrieve all user orders |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "order_id": "ORD-123456",
      "sku_id": "SKU001",
      "sku_name": "Premium Headphones",
      "status": "pending",
      "total_amount": 4999,
      "created_at": "2024-11-09T10:30:00Z"
    }
  ],
  "message": "Orders retrieved successfully"
}
```

---

#### Cancel Order
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PATCH` | `/api/orders` | Cancel an existing order |

**Request Body:**
```json
{
  "order_id": "ORD-123456",
  "reason_of_cancellation": "Changed my mind"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

---

## 🔐 Authentication

### JWT Token System

The API uses JSON Web Tokens (JWT) for authentication:

- **Auth Token**: Short-lived token (15 minutes) for API requests
- **Refresh Token**: Long-lived token (7 days) for obtaining new auth tokens

### How Authentication Works

```
1. User logs in/signs up
        ↓
2. Server generates authToken + refreshToken
        ↓
3. Client stores both tokens
        ↓
4. Client sends authToken in Authorization header for API calls
        ↓
5. Server validates token using tokenCheck middleware
        ↓
6. If authToken expired, client uses refreshToken to get new authToken
```

### Using Authentication

**Include JWT in Request Header:**
```bash
curl -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
     http://localhost:5000/api/cart
```

**Example with fetch:**
```javascript
fetch('http://localhost:5000/api/cart', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }
});
```

### Token Validation Middleware

**File:** `app/middleware/auth_check.js`

All authenticated endpoints use the `tokenCheck` middleware which:
- Validates JWT signature
- Checks token expiration
- Extracts user information
- Passes `req.user` to the endpoint handler

---

## 📚 API Documentation

### Interactive Swagger Documentation

Once the server is running, visit:

```
http://localhost:5000/docs
```

This provides:
- ✅ Complete API endpoint reference
- ✅ Try-it-out feature for testing endpoints
- ✅ Request/response schema documentation
- ✅ Authentication configuration

### Response Format

All API responses follow a standard format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

### Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input data |
| `401` | Unauthorized - Authentication failed |
| `409` | Conflict - Resource already exists |
| `500` | Internal Server Error |

---

## 🛠️ Development

### Project Structure

```
app/
├── apis/
│   └── [Feature]/
│       ├── api.js              # Route definitions
│       ├── [operation].js       # Business logic
│       ├── tokencheck.js        # Auth validation
│       └── README.md            # Feature documentation
├── middleware/
│   ├── auth_check.js            # JWT validation
│   └── refresh_check.js         # Refresh token handling
├── utility/
│   └── db.js                    # Supabase client
└── server.js                    # Express app configuration
```

### Adding a New API Endpoint

1. **Create a new folder** under `apis/`
2. **Create `api.js`** with route definitions
3. **Create operation files** for business logic
4. **Use Swagger comments** for documentation
5. **Add tokenCheck middleware** for protected routes

**Example:**
```javascript
import express from 'express';
import { tokenCheck } from './tokencheck.js';
import { getFeature } from './get_feature.js';

const router = express.Router();

/**
 * @openapi
 * /api/feature:
 *   get:
 *     summary: Get feature data
 *     tags:
 *       - Feature
 *     responses:
 *       200:
 *         description: Feature retrieved
 */
router.get('/', tokenCheck, async (req, res) => {
  try {
    const result = await getFeature(req.user.uid);
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error' });
  }
});

export default router;
```

### Testing Endpoints

Use any of these tools:
- **Postman** - Import Swagger docs URL
- **Insomnia** - REST API client
- **cURL** - Command line tool
- **Swagger UI** - `http://localhost:5000/docs`

---

## 🐳 Docker

### Building Docker Image

```bash
cd backend
docker build -t emi-shopping-backend:1.0 .
```

### Running Container

```bash
docker run \
  -e SUPABASE_URL=your_url \
  -e SUPABASE_KEY=your_key \
  -e SUPABASE_SCHEMA=public \
  -e JWT_SECRET=your_secret \
  -e JWT_REFRESH_SECRET=your_refresh_secret \
  -p 5000:5000 \
  emi-shopping-backend:1.0
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      SUPABASE_URL: ${SUPABASE_URL}
      SUPABASE_KEY: ${SUPABASE_KEY}
      SUPABASE_SCHEMA: public
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
    depends_on:
      - postgres
```

---

## 📊 Database Schema Overview

### Users Table
```sql
CREATE TABLE users (
  uid UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### SKU Info Table
```sql
CREATE TABLE sku_info (
  sku_id VARCHAR(50) PRIMARY KEY,
  sku_name VARCHAR(255),
  category VARCHAR(100),
  price DECIMAL(10, 2),
  quantity INTEGER,
  description TEXT,
  best_selling BOOLEAN DEFAULT FALSE,
  special_tag BOOLEAN DEFAULT FALSE,
  product_image_1_url TEXT
);
```

### Orders Table
```sql
CREATE TABLE orders (
  order_id VARCHAR(50) PRIMARY KEY,
  uid UUID REFERENCES users(uid),
  sku_id VARCHAR(50) REFERENCES sku_info(sku_id),
  ad_id VARCHAR(50),
  status VARCHAR(50),
  final_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

---

## 📝 License

This project is part of the EMI Shopping App project.

---

## 🆘 Support & Troubleshooting

### Common Issues

**Issue: "Missing SUPABASE_URL or SUPABASE_KEY"**
- Solution: Check your `.env` file has correct Supabase credentials

**Issue: "JWT token invalid"**
- Solution: Ensure token is included in `Authorization: Bearer <token>` header

**Issue: "CORS error"**
- Solution: Backend CORS is configured to allow all origins for development

### Get Help

- 📧 Email: support@emiapp.com
- 📚 Documentation: Check API docs at `/docs`
- 🐛 Report bugs: Create an issue in the repository

---

## 👨‍💻 Team

Developed with ❤️ by the EMI Shopping App Team

---

**Last Updated:** November 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
