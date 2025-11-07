import { runQuery } from '../../utility/db.js';

async function insertWishlist(userId, skuId) {
  try {
    if (!userId || !skuId) {
      return {
        success: false,
        message: 'User ID and SKU ID are required',
      };
    }

    await runQuery(async (supabase) => {
      const { error } = await supabase
        .from('user_preference')
        .upsert({
          user_id: userId,
          sku_id: skuId,
          wishlist: true,
        });

      if (error) {
        throw new Error(error.message);
      }
    });

    return { success: true, message: 'Item added to wishlist successfully' };
  } catch (error) {
    console.error('Error inserting into wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default insertWishlist;