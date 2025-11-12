import { runQuery, tables } from '../../utility/db.js';

/**
 * Inserts a new address for a user
 * @param {object} addressData - Address data containing state, city, pincode, landmark, flat_house, phone_number, special_address, receivers_name
 * @param {string} uid - User ID derived from the auth token
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function insertAddress(addressData, uid) {
  try {
    const { state, city, pincode, landmark, flat_house, phone_number, special_address, receivers_name } = addressData;

    if (!state || !city || !pincode || !flat_house || !phone_number || !receivers_name) {
      return {
        success: false,
        message: 'All required fields must be provided',
      };
    }

    const query = `
      INSERT INTO ${tables.userAddress} (
        uid,
        state,
        city,
        pincode,
        landmark,
        flat_house,
        phone_number,
        special_address,
        receivers_name
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `
    await runQuery(query, [
      uid,
      state,
      city,
      pincode,
      landmark,
      flat_house,
      phone_number,
      special_address,
      receivers_name,
    ]);

    return {
      success: true,
      message: 'Address inserted successfully',
    };
  } catch (err) {
    console.error('Error inserting address:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to insert address',
    };
  }
}
