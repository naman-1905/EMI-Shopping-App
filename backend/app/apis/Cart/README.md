# Cart API

The Cart API allows users to manage their cart, including adding, removing, and fetching items.

## Endpoints

### POST `/api/cart`
- **Description:** Adds an item to the user's cart.
- **Request Body:**
  ```json
  {
    "sku_id": "uuid"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item added to cart successfully"
  }
  ```

### DELETE `/api/cart`
- **Description:** Removes an item from the user's cart.
- **Request Body:**
  ```json
  {
    "sku_id": "uuid"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item removed from cart successfully"
  }
  ```

### GET `/api/cart`
- **Description:** Fetches all items in the user's cart.
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "sku_id": "uuid",
        "sku_name": "string",
        "price": "number",
        "quantity": "number"
      }
    ],
    "message": "Cart items retrieved successfully"
  }
  ```

## Middleware

### `tokencheck.js`
- Validates the authentication token for all Cart API routes.

## Modules

### `InsertCart.js`
- Adds an item to the `user_preference` table with `cart: true`.

### `DeleteCart.js`
- Updates the `user_preference` table to set `cart: false` for the specified item.

### `AllCartItems.js`
- Retrieves all items from the `user_preference` table where `cart: true` for the authenticated user.

## Database Table

### `user_preference`
- **Description:** Stores user preferences, including cart items.
- **Columns:**
  - `user_id` (UUID): The ID of the user.
  - `sku_id` (UUID): The ID of the SKU.
  - `cart` (Boolean): Indicates if the item is in the cart.

## Usage
1. Ensure the `.env` file contains the JWT secret.
2. Import the Cart API router in your `server.js` file:
   ```javascript
   import cartRouter from './apis/Cart/api.js';
   app.use('/api/cart', cartRouter);
   ```