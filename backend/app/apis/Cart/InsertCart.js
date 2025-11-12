import { runQuery, tables } from '../../utility/db.js';

/**
 * Inserts an item into the user's cart
 * @param {string} user_id - User ID
 * @param {string} sku_id - SKU ID
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function insertCart(user_id, sku_id) {
  try {
    if (!user_id || !sku_id) {
      return {
        success: false,
        message: 'User ID and SKU ID are required',
      };
    }

    const query = `
      INSERT INTO ${tables.userPreference} (user_id, sku_id, cart)
      VALUES ($1, $2, true)
      ON CONFLICT (user_id, sku_id)
      DO UPDATE SET cart = true
    `
    await runQuery(query, [user_id, sku_id]);

    return {
      success: true,
      message: 'Item added to cart successfully',
    };
  } catch (err) {
    console.error('Error inserting into cart:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to add item to cart',
    };
  }
}
