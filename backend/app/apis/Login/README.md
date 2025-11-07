# Login API

The Login API is responsible for authenticating users in the EMI Shopping App. It validates user credentials, checks for existing accounts, and generates authentication and refresh tokens upon successful login.

## Endpoints

### POST `/api/login`

#### Description
Authenticates a user and returns authentication tokens.

#### Request Body
The request body should be in JSON format and include the following fields:

| Field       | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| email       | string | Yes      | User's email address                 |
| password    | string | Yes      | User's password                      |

#### Example
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Responses

| Status Code | Description                          | Response Body                                                                 |
|-------------|--------------------------------------|-------------------------------------------------------------------------------|
| 200         | Login successful                     | `{ success: true, authToken: "...", refreshToken: "...", message: "..." }` |
| 400         | Validation errors                    | `{ success: false, message: "Validation error message" }`                |
| 401         | Unauthorized (invalid credentials)   | `{ success: false, message: "Invalid password" }`                        |
| 500         | Internal server error                | `{ success: false, message: "Internal server error" }`                   |

## Modules

### `check_user_exist.js`
Checks if a user exists in the database based on their email.

#### Function: `checkUserExists(email)`
- **Input:** `email` (string)
- **Output:** `{ exists: boolean, user?: object, message?: string }`

### `generate_auth_and_refresh_token.js`
Generates authentication and refresh tokens for the user.

#### Function: `generateAuthRefreshTokens(user)`
- **Input:** `user` (object with `uid`, `email`, etc.)
- **Output:** `{ success: boolean, authToken?: string, refreshToken?: string, message?: string }`

### `login_and_get_token.js`
Validates user credentials and generates tokens upon successful login.

#### Function: `loginAndGetToken(email, password)`
- **Input:** `email` (string), `password` (string)
- **Output:** `{ success: boolean, authToken?: string, refreshToken?: string, message?: string }`

## Error Handling
- **Validation Errors:** Ensures all required fields are provided and valid.
- **Authentication Errors:** Handles invalid credentials or non-existent users.
- **Token Generation Errors:** Handles issues during JWT token creation.

## Usage
1. Ensure the `.env` file contains the following variables:
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_jwt_secret
   ```
2. Import the Login API router in your `server.js` file:
   ```javascript
   import loginRouter from './apis/Login/api.js';
   app.use('/api/login', loginRouter);
   ```
3. Test the endpoint using tools like Postman or Swagger UI.