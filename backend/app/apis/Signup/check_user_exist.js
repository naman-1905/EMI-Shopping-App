import { runQuery } from '../../utility/db.js';

/**
 * Checks if a user already exists with the given email
 * @param {string} email - User's email address
 * @returns {Promise<{exists: boolean, message?: string}>}
 */
export async function checkUserExists(email) {
  try {
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {
        exists: false,
        message: 'Invalid email provided',
      };
    }

    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('user_info')
        .select('uid, email')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = No rows found
        throw new Error(error.message);
      }

      return data;
    });

    return {
      exists: !!result,
      message: result ? 'User already exists' : 'User does not exist',
    };
  } catch (err) {
    console.error('Error checking user existence:', err.message);
    return {
      exists: false,
      message: err.message || 'Failed to check user existence',
    };
  }
}
