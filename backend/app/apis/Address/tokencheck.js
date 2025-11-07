import { verifyAuthToken } from '../../middleware/auth_check.js';

/**
 * Middleware to check authentication token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
export function tokenCheck(req, res, next) {
  verifyAuthToken(req, res, next);
}