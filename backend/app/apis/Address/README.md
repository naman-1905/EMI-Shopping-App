# Address API

The Address API allows users to manage their addresses, including adding, updating, deleting, and retrieving addresses.

## Endpoints

### GET `/api/address`
- **Description:** Retrieves all addresses for the authenticated user.
- **Response:**
  ```json
  {
    "success": true,
    "addresses": [
      {
        "ad_id": "uuid",
        "uid": "uuid",
        "state": "State",
        "city": "City",
        "pincode": "123456",
        "landmark": "Near Park",
        "flat_house": "Flat 101",
        "phone_number": "9876543210",
        "special_address": "Home",
        "receivers_name": "John Doe"
      }
    ]
  }
  ```

### POST `/api/address`
- **Description:** Adds a new address for the authenticated user.
- **Request Body:**
  ```json
  {
    "uid": "uuid",
    "state": "State",
    "city": "City",
    "pincode": "123456",
    "landmark": "Near Park",
    "flat_house": "Flat 101",
    "phone_number": "9876543210",
    "special_address": "Home",
    "receivers_name": "John Doe"
  }
  ```

### PUT `/api/address`
- **Description:** Updates an existing address for the authenticated user.
- **Request Body:**
  ```json
  {
    "ad_id": "uuid",
    "uid": "uuid",
    "state": "State",
    "city": "City",
    "pincode": "123456",
    "landmark": "Near Park",
    "flat_house": "Flat 101",
    "phone_number": "9876543210",
    "special_address": "Home",
    "receivers_name": "John Doe"
  }
  ```

### DELETE `/api/address`
- **Description:** Deletes an address for the authenticated user.
- **Request Body:**
  ```json
  {
    "ad_id": "uuid"
  }
  ```

## Middleware

### `tokencheck.js`
- Validates the authentication token for all Address API routes.

## Modules

### `insert_address.js`
- Inserts a new address into the `user_address` table.

### `update_address.js`
- Updates an existing address in the `user_address` table.

### `delete_address.js`
- Deletes an address from the `user_address` table.

## Usage
1. Ensure the `.env` file contains the JWT secret.
2. Import the Address API router in your `server.js` file:
   ```javascript
   import addressRouter from './apis/Address/api.js';
   app.use('/api/address', addressRouter);
   ```