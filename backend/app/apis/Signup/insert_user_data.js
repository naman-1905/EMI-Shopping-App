import bcrypt from 'bcryptjs';
import { runQuery, tables } from '../../utility/db.js';

/**
 * Inserts new user data into the database
 * @param {object} userData - User data containing first_name, last_name, email, password
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
export async function insertUserData(userData) {
  try {
    const { first_name, last_name, email, password } = userData;

    // Validate required fields
    if (!first_name || !email || !password) {
      return {
        success: false,
        message: 'First name, email, and password are required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Invalid email format',
      };
    }

    // Validate password length
    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long',
      };
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const normalizedEmail = email.trim().toLowerCase()
    const query = `
      INSERT INTO ${tables.userInfo} (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING uid, first_name, last_name, email
    `
    const { rows } = await runQuery(query, [
      first_name.trim(),
      last_name?.trim() || '',
      normalizedEmail,
      hashedPassword,
    ])

    const result = rows[0]

    return {
      success: true,
      user: result,
      message: 'User created successfully',
    };
  } catch (err) {
    console.error('Error inserting user data:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to create user',
    };
  }
}
