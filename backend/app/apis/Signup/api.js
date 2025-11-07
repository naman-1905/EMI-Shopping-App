import express from 'express';
import { checkUserExists } from './check_user_exist.js';
import { insertUserData } from './insert_user_data.js';
import { generateAuthRefreshTokens } from './generate_auth_refresh_token.js';

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with authentication tokens
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name (optional)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password (minimum 6 characters)
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 authToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (validation errors)
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const userExists = await checkUserExists(email);
    if (userExists.exists) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Insert user data
    const userResult = await insertUserData({
      first_name,
      last_name,
      email,
      password,
    });

    if (!userResult.success) {
      return res.status(400).json({
        success: false,
        message: userResult.message,
      });
    }

    // Generate tokens
    const tokenResult = await generateAuthRefreshTokens(userResult.user);
    if (!tokenResult.success) {
      return res.status(500).json({
        success: false,
        message: tokenResult.message,
      });
    }

    // Return success response
    res.status(201).json({
      success: true,
      user: userResult.user,
      authToken: tokenResult.authToken,
      refreshToken: tokenResult.refreshToken,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error('Error in signup endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
