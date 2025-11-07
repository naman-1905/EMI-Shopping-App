import bcrypt from 'bcryptjs';
import { checkUserExists } from './check_user_exist.js';
import { generateAuthRefreshTokens } from './generate_auth_and_refresh_token.js';

/**
 * Logs in a user and generates authentication tokens
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, authToken?: string, refreshToken?: string, message?: string}>}
 */
export async function loginAndGetToken(email, password) {
  try {
    // Check if user exists
    const userCheck = await checkUserExists(email);
    if (!userCheck.exists) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    const user = userCheck.user;

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid password',
      };
    }

    // Generate tokens
    const tokenResult = await generateAuthRefreshTokens(user);
    if (!tokenResult.success) {
      return {
        success: false,
        message: tokenResult.message,
      };
    }

    return {
      success: true,
      authToken: tokenResult.authToken,
      refreshToken: tokenResult.refreshToken,
      message: 'Login successful',
    };
  } catch (err) {
    console.error('Error during login:', err.message);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
}
