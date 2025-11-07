import express from 'express';
import { loginAndGetToken } from './login_and_get_token.js';

const router = express.Router();

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns authentication tokens
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 authToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (validation errors)
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const loginResult = await loginAndGetToken(email, password);

    if (!loginResult.success) {
      const statusCode = loginResult.message === 'Invalid password' || loginResult.message === 'User does not exist' ? 401 : 500;
      return res.status(statusCode).json({
        success: false,
        message: loginResult.message,
      });
    }

    res.status(200).json({
      success: true,
      authToken: loginResult.authToken,
      refreshToken: loginResult.refreshToken,
      message: loginResult.message,
    });
  } catch (err) {
    console.error('Error in login endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;