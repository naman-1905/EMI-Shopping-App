# Middleware

The middleware in the EMI Shopping App backend is responsible for handling authentication and token validation. It ensures secure access to protected resources by verifying JWT authentication and refresh tokens.

## Modules

### `api.js`
This module defines the API endpoints for validating authentication and refresh tokens.

#### Endpoints

1. **POST `/api/auth/validate-token`**
   - **Description:** Validates the provided authentication token.
   - **Request Body:**
     ```json
     {
       "token": "<JWT_AUTH_TOKEN>"
     }
     ```
   - **Responses:**
     - `200 OK`: Token is valid.
     - `400 Bad Request`: Token is missing.
     - `500 Internal Server Error`: Token validation failed.

2. **POST `/api/auth/validate-refresh-token`**
   - **Description:** Validates the provided refresh token.
   - **Request Body:**
     ```json
     {
       "token": "<JWT_REFRESH_TOKEN>"
     }
     ```
   - **Responses:**
     - `200 OK`: Refresh token is valid.
     - `400 Bad Request`: Token is missing.
     - `500 Internal Server Error`: Token validation failed.

### `auth_check.js`
This module provides middleware and utility functions for validating authentication tokens.

#### Functions

1. **`verifyAuthToken(req, res, next)`**
   - Middleware to verify the JWT authentication token from the `Authorization` header.
   - Attaches the decoded user information to `req.user`.

2. **`validateAuthToken(token)`**
   - Validates the provided authentication token.
   - **Input:** `token` (string)
   - **Output:** `{ valid: boolean, user?: object, message?: string }`

### `refresh_check.js`
This module provides middleware and utility functions for validating refresh tokens.

#### Functions

1. **`verifyRefreshToken(req, res, next)`**
   - Middleware to verify the JWT refresh token from the `Authorization` header.
   - Attaches the decoded user information to `req.user`.

2. **`validateRefreshToken(token)`**
   - Validates the provided refresh token.
   - **Input:** `token` (string)
   - **Output:** `{ valid: boolean, user?: object, message?: string }`

## Usage

1. **Environment Variables:** Ensure the following variables are set in the `.env` file:
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_jwt_secret
   ```

2. **Import Middleware in Routes:**
   ```javascript
   import { verifyAuthToken } from './middleware/auth_check.js';
   import { verifyRefreshToken } from './middleware/refresh_check.js';

   app.use('/protected-route', verifyAuthToken, (req, res) => {
     res.json({ message: 'Access granted to protected route' });
   });
   ```

3. **Test Endpoints:** Use tools like Postman or Swagger UI to test the middleware endpoints for token validation.

## Error Handling
- **Token Errors:** Handles missing, expired, or invalid tokens.
- **Configuration Errors:** Ensures JWT secrets are configured in the environment variables.

## Notes
- The middleware is designed to be modular and reusable across different routes.
- Ensure proper error handling and logging for production environments.