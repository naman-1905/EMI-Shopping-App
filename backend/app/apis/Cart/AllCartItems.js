import { runQuery } from '../../utility/db.js';

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

    const cartItems = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('user_preference')
        .select(`
          sku_id,
          sku_info(sku_id, sku_name, price, quantity)
        `)
        .eq('user_id', user_id)
        .eq('cart', true);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    });

    return {
      success: true,
      data: cartItems || [],
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
