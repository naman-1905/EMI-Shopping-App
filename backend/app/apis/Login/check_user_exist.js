import { runQuery, tables } from '../../utility/db.js';

/**
 * Checks if a user exists with the given email
 * @param {string} email - User's email address
 * @returns {Promise<{exists: boolean, user?: object, message?: string}>}
 */
export async function checkUserExists(email) {
  try {
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {
        exists: false,
        message: 'Invalid email provided',
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const query = `
      SELECT uid, email, password, first_name, last_name
      FROM ${tables.userInfo}
      WHERE email = $1
      LIMIT 1
    `
    const { rows } = await runQuery(query, [normalizedEmail])
    const result = rows[0] ?? null

    return {
      exists: !!result,
      user: result,
      message: result ? 'User found' : 'User does not exist',
    };
  } catch (err) {
    console.error('Error checking user existence:', err.message);
    return {
      exists: false,
      message: err.message || 'Failed to check user existence',
    };
  }
}
