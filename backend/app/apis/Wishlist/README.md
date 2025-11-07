# Wishlist API

The Wishlist API allows users to manage their wishlist, including adding, removing, and fetching items.

## Endpoints

### POST `/api/wishlist`
- **Description:** Adds an item to the user's wishlist.
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
    "message": "Item added to wishlist successfully"
  }
  ```

### DELETE `/api/wishlist`
- **Description:** Removes an item from the user's wishlist.
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
    "message": "Item removed from wishlist successfully"
  }
  ```

### GET `/api/wishlist`
- **Description:** Fetches all items in the user's wishlist.
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
    "message": "Wishlist items retrieved successfully"
  }
  ```

## Middleware

### `tokencheck.js`
- Validates the authentication token for all Wishlist API routes.

## Modules

### `insert_wishlist.js`
- Adds an item to the `user_preference` table with `wishlist: true`.

### `delete_wishlist.js`
- Updates the `user_preference` table to set `wishlist: false` for the specified item.

### `fetch_wishlist.js`
- Retrieves all items from the `user_preference` table where `wishlist: true` for the authenticated user.

## Database Table

### `user_preference`
- **Description:** Stores user preferences, including wishlist items.
- **Columns:**
  - `user_id` (UUID): The ID of the user.
  - `sku_id` (UUID): The ID of the SKU.
  - `wishlist` (Boolean): Indicates if the item is in the wishlist.

## Usage
1. Ensure the `.env` file contains the JWT secret.
2. Import the Wishlist API router in your `server.js` file:
   ```javascript
   import wishlistRouter from './apis/Wishlist/api.js';
   app.use('/api/wishlist', wishlistRouter);
   ```