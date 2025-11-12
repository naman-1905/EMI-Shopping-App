import { runQuery, tables } from '../../utility/db.js';

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

    const query = `
      UPDATE ${tables.userAddress}
      SET
        state = $2,
        city = $3,
        pincode = $4,
        landmark = $5,
        flat_house = $6,
        phone_number = $7,
        special_address = $8,
        receivers_name = $9
      WHERE ad_id = $1
        AND uid = $10
    `
    await runQuery(query, [
      ad_id,
      state,
      city,
      pincode,
      landmark,
      flat_house,
      phone_number,
      special_address,
      receivers_name,
      uid,
    ]);

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
