import { runQuery } from '../../utility/db.js';

async function fetchWishlist(userId) {
  try {
    if (!userId) {
      return {
        success: false,
        message: 'User ID is required',
      };
    }

    const wishlistItems = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('user_preference')
        .select(`
          sku_id,
          sku_info(sku_id, sku_name, price, quantity)
        `)
        .eq('user_id', userId)
        .eq('wishlist', true);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    });

    return { 
      success: true, 
      data: wishlistItems || [], 
      message: 'Wishlist items retrieved successfully' 
    };
  } catch (error) {
    console.error('Error fetching wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default fetchWishlist;