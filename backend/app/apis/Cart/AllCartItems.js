import { runQuery, tables } from '../../utility/db.js';

/**
 * Fetches all cart items for a user
 * @param {string} user_id - User ID
 * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
 */
export async function getAllCartItems(user_id) {
  try {
    if (!user_id) {
      return {
        success: false,
        message: 'User ID is required',
      };
    }

    const query = `
      SELECT
        up.sku_id,
        CASE
          WHEN si.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'sku_id', si.sku_id,
            'sku_name', si.sku_name,
            'price', si.price,
            'quantity', si.quantity
          )
        END AS sku_info
      FROM ${tables.userPreference} up
      LEFT JOIN ${tables.skuInfo} si ON up.sku_id = si.sku_id
      WHERE up.user_id = $1
        AND up.cart = true
      ORDER BY si.sku_name
    `
    const { rows } = await runQuery(query, [user_id])

    return {
      success: true,
      data: rows,
      message: 'Cart items retrieved successfully',
    };
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch cart items',
    };
  }
}
