import { runQuery } from '../../utility/db.js';

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

    const result = await runQuery(async (supabase) => {
      const { error } = await supabase
        .from('user_preference')
        .upsert({
          user_id,
          sku_id,
          cart: true,
        });

      if (error) {
        throw new Error(error.message);
      }
    });

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