import express from 'express';
import { validateAuthToken } from './auth_check.js';
import { validateRefreshToken } from './refresh_check.js';

const router = express.Router();

/**
 * @openapi
 * /api/auth/validate-token:
 *   post:
 *     summary: Validate authentication token
 *     description: Checks if the provided authentication token is valid
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT authentication token
 *     responses:
 *       200:
 *         description: Token validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 valid:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/validate-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Token is required',
      });
    }

    const result = await validateAuthToken(token);
    
    res.status(200).json({
      success: true,
      valid: result.valid,
      user: result.user || null,
      message: result.message,
    });
  } catch (err) {
    console.error('Error in validate-token endpoint:', err.message);
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @openapi
 * /api/auth/validate-refresh-token:
 *   post:
 *     summary: Validate refresh token
 *     description: Checks if the provided refresh token is valid
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT refresh token
 *     responses:
 *       200:
 *         description: Refresh token validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 valid:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/validate-refresh-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Refresh token is required',
      });
    }

    const result = await validateRefreshToken(token);
    
    res.status(200).json({
      success: true,
      valid: result.valid,
      user: result.user || null,
      message: result.message,
    });
  } catch (err) {
    console.error('Error in validate-refresh-token endpoint:', err.message);
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Internal server error',
    });
  }
});

export default router;
