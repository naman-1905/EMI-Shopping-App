# Signup API

The Signup API is responsible for registering new users in the EMI Shopping App. It validates user input, checks for existing accounts, securely stores user data, and generates authentication and refresh tokens.

## Endpoints

### POST `/api/signup`

#### Description
Creates a new user account and returns authentication tokens.

#### Request Body
The request body should be in JSON format and include the following fields:

| Field       | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| first_name  | string | Yes      | User's first name                    |
| last_name   | string | No       | User's last name                     |
| email       | string | Yes      | User's email address                 |
| password    | string | Yes      | User's password (minimum 6 characters) |

#### Example
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Responses

| Status Code | Description                          | Response Body                                                                 |
|-------------|--------------------------------------|-------------------------------------------------------------------------------|
| 201         | User created successfully            | `{ success: true, user: {...}, authToken: "...", refreshToken: "..." }` |
| 400         | Validation errors                    | `{ success: false, message: "Validation error message" }`                |
| 409         | User already exists                  | `{ success: false, message: "User already exists with this email" }`     |
| 500         | Internal server error                | `{ success: false, message: "Internal server error" }`                   |

## Modules

### `check_user_exist.js`
Checks if a user already exists in the database based on their email.

#### Function: `checkUserExists(email)`
- **Input:** `email` (string)
- **Output:** `{ exists: boolean, message?: string }`

### `insert_user_data.js`
Inserts new user data into the database after validation and password hashing.

#### Function: `insertUserData(userData)`
- **Input:** `userData` (object with `first_name`, `last_name`, `email`, `password`)
- **Output:** `{ success: boolean, user?: object, message?: string }`

### `generate_auth_refresh_token.js`
Generates authentication and refresh tokens for the user.

#### Function: `generateAuthRefreshTokens(user)`
- **Input:** `user` (object with `uid`, `email`, etc.)
- **Output:** `{ success: boolean, authToken?: string, refreshToken?: string, message?: string }`

## Error Handling
- **Validation Errors:** Ensures all required fields are provided and valid.
- **Database Errors:** Handles errors during database queries.
- **Token Generation Errors:** Handles issues during JWT token creation.

## Usage
1. Ensure the `.env` file contains the following variables:
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_jwt_secret
   ```
2. Import the Signup API router in your `server.js` file:
   ```javascript
   import signupRouter from './apis/Signup/api.js';
   app.use('/api/signup', signupRouter);
   ```
3. Test the endpoint using tools like Postman or Swagger UI.