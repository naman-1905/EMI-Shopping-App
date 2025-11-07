import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Middleware to verify JWT authentication token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
export function verifyAuthToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: 'JWT secret not configured',
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error('Auth token verification error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token has expired',
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Token verification failed',
      });
    }
  }
}

/**
 * Function to validate auth token and return boolean result
 * @param {string} token - JWT auth token
 * @returns {Promise<{valid: boolean, user?: object, message?: string}>}
 */
export async function validateAuthToken(token) {
  try {
    if (!token) {
      return {
        valid: false,
        message: 'Token is required',
      };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT secret not configured');
    }

    const decoded = jwt.verify(token, jwtSecret);
    return {
      valid: true,
      user: decoded,
      message: 'Token is valid',
    };
  } catch (err) {
    console.error('Auth token validation error:', err.message);
    return {
      valid: false,
      message: err.message || 'Token validation failed',
    };
  }
}
