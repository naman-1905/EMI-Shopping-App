import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Generates authentication and refresh tokens for a user
 * @param {object} user - User object containing uid, email, etc.
 * @returns {Promise<{success: boolean, authToken?: string, refreshToken?: string, message?: string}>}
 */
export async function generateAuthRefreshTokens(user) {
  try {
    if (!user || !user.uid || !user.email) {
      return {
        success: false,
        message: 'Invalid user data provided',
      };
    }

    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error('JWT secrets not configured in environment variables');
    }

    // Payload for tokens
    const payload = {
      uid: user.uid,
      email: user.email,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
    };

    // Generate auth token (24 hours)
    const authToken = jwt.sign(
      payload,
      jwtSecret,
      { 
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    // Generate refresh token (1 month)
    const refreshToken = jwt.sign(
      { uid: user.uid, email: user.email },
      jwtRefreshSecret,
      { 
        expiresIn: '30d',
        algorithm: 'HS256'
      }
    );

    return {
      success: true,
      authToken,
      refreshToken,
      message: 'Tokens generated successfully',
    };
  } catch (err) {
    console.error('Error generating tokens:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to generate tokens',
    };
  }
}
