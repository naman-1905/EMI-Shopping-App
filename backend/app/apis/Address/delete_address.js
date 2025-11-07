import { runQuery } from '../../utility/db.js';

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

    const result = await runQuery(async (supabase) => {
      const { error } = await supabase
        .from('user_address')
        .delete()
        .eq('ad_id', ad_id)
        .eq('uid', uid);

      if (error) {
        throw new Error(error.message);
      }
    });

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