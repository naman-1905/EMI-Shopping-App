import { runQuery } from '../../utility/db.js';

/**
 * Removes an item from the user's cart
 * @param {string} user_id - User ID
 * @param {string} sku_id - SKU ID
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function deleteCart(user_id, sku_id) {
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
        .update({ cart: false })
        .eq('user_id', user_id)
        .eq('sku_id', sku_id);

      if (error) {
        throw new Error(error.message);
      }
    });

    return {
      success: true,
      message: 'Item removed from cart successfully',
    };
  } catch (err) {
    console.error('Error removing from cart:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to remove item from cart',
    };
  }
}