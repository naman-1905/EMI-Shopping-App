import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Middleware to verify JWT refresh token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
export function verifyRefreshToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtRefreshSecret) {
      return res.status(500).json({
        success: false,
        message: 'JWT refresh secret not configured',
      });
    }

    const decoded = jwt.verify(token, jwtRefreshSecret);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error('Refresh token verification error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token has expired',
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Refresh token verification failed',
      });
    }
  }
}

/**
 * Function to validate refresh token and return boolean result
 * @param {string} token - JWT refresh token
 * @returns {Promise<{valid: boolean, user?: object, message?: string}>}
 */
export async function validateRefreshToken(token) {
  try {
    if (!token) {
      return {
        valid: false,
        message: 'Refresh token is required',
      };
    }

    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!jwtRefreshSecret) {
      throw new Error('JWT refresh secret not configured');
    }

    const decoded = jwt.verify(token, jwtRefreshSecret);
    return {
      valid: true,
      user: decoded,
      message: 'Refresh token is valid',
    };
  } catch (err) {
    console.error('Refresh token validation error:', err.message);
    return {
      valid: false,
      message: err.message || 'Refresh token validation failed',
    };
  }
}
