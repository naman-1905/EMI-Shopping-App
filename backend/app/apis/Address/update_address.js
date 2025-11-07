import { runQuery } from '../../utility/db.js';

/**
 * Updates an existing address for a user
 * @param {object} addressData - Address data containing ad_id, state, city, pincode, landmark, flat_house, phone_number, special_address, receivers_name
 * @param {string} uid - User ID derived from the auth token
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function updateAddress(addressData, uid) {
  try {
    const { ad_id, state, city, pincode, landmark, flat_house, phone_number, special_address, receivers_name } = addressData;

    if (!ad_id || !state || !city || !pincode || !flat_house || !phone_number || !receivers_name) {
      return {
        success: false,
        message: 'All required fields must be provided',
      };
    }

    const result = await runQuery(async (supabase) => {
      const { error } = await supabase
        .from('user_address')
        .update({
          state,
          city,
          pincode,
          landmark,
          flat_house,
          phone_number,
          special_address,
          receivers_name,
        })
        .eq('ad_id', ad_id)
        .eq('uid', uid);

      if (error) {
        throw new Error(error.message);
      }
    });

    return {
      success: true,
      message: 'Address updated successfully',
    };
  } catch (err) {
    console.error('Error updating address:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to update address',
    };
  }
}