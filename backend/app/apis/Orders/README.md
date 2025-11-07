# Orders API

The Orders API allows users to create, view, and manage their orders.

## Endpoints

### POST `/api/orders`
- **Description:** Creates a new order for the user.
- **Request Body:**
  ```json
  {
    "ad_id": "uuid",
    "sku_id": "uuid",
    "ex_delivery_date": "2025-12-31",
    "cash": true,
    "mutual_fund_emi": false,
    "emi": false,
    "planned_month": 0,
    "quantity": 1,
    "final_price": 999.99
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "order_id": "uuid",
    "message": "Order created successfully"
  }
  ```

### GET `/api/orders`
- **Description:** Fetches all orders for the authenticated user.
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "order_id": "uuid",
        "uid": "uuid",
        "ad_id": "uuid",
        "sku_id": "uuid",
        "ordered_on": "2025-11-07T10:30:00Z",
        "ex_delivery_date": "2025-12-31",
        "cash": true,
        "mutual_fund_emi": false,
        "emi": false,
        "planned_month": 0,
        "quantity": 1,
        "final_price": 999.99,
        "cancel": false,
        "reason_of_cancellation": null,
        "sku_info": {},
        "user_address": {}
      }
    ],
    "message": "Orders retrieved successfully"
  }
  ```

### PATCH `/api/orders`
- **Description:** Cancels an existing order.
- **Request Body:**
  ```json
  {
    "order_id": "uuid",
    "reason_of_cancellation": "Changed my mind"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Order cancelled successfully"
  }
  ```

## Middleware

### `tokencheck.js`
- Validates the authentication token for all Orders API routes.

## Modules

### `create_order.js`
- Creates a new order in the `order_sku` table.

### `all_order.js`
- Retrieves all orders for a user from the `order_sku` table with related SKU and address information.

### `cancel_order.js`
- Updates an order to mark it as cancelled and store the reason for cancellation.

## Database Table

### `order_sku`
- **Description:** Stores order information including SKU, address, delivery date, and payment method.
- **Columns:**
  - `order_id` (UUID): Primary key for the order.
  - `uid` (UUID): User ID from `user_info` table.
  - `ad_id` (UUID): Address ID from `user_address` table.
  - `sku_id` (UUID): SKU ID from `sku_info` table.
  - `ordered_on` (TIMESTAMP): Order placement timestamp.
  - `ex_delivery_date` (DATE): Expected delivery date.
  - `cash` (Boolean): Cash payment flag.
  - `mutual_fund_emi` (Boolean): Mutual fund EMI flag.
  - `emi` (Boolean): EMI flag.
  - `planned_month` (INT): Number of months for EMI.
  - `quantity` (INT): Quantity ordered.
  - `final_price` (NUMERIC): Final price of the order.
  - `cancel` (Boolean): Order cancellation flag.
  - `reason_of_cancellation` (TEXT): Reason for cancellation.

## Usage
1. Ensure the `.env` file contains the JWT secret.
2. Import the Orders API router in your `server.js` file:
   ```javascript
   import ordersRouter from './apis/Orders/api.js';
   app.use('/api/orders', ordersRouter);
   ```
