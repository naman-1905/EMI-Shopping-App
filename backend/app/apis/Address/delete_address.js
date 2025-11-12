import { runQuery, tables } from '../../utility/db.js';

/**
 * Deletes an address for a user
 * @param {string} ad_id - Address ID
 * @param {string} uid - User ID
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function deleteAddress(ad_id, uid) {
  try {
    if (!ad_id || !uid) {
      return {
        success: false,
        message: 'Address ID and User ID are required',
      };
    }

    const query = `
      DELETE FROM ${tables.userAddress}
      WHERE ad_id = $1
        AND uid = $2
    `
    await runQuery(query, [ad_id, uid]);

    return {
      success: true,
      message: 'Address deleted successfully',
    };
  } catch (err) {
    console.error('Error deleting address:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to delete address',
    };
  }
}
