import { runQuery } from '../../utility/db.js';

async function deleteWishlist(userId, skuId) {
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
        .update({ wishlist: false })
        .eq('user_id', userId)
        .eq('sku_id', skuId);

      if (error) {
        throw new Error(error.message);
      }
    });

    return { success: true, message: 'Item removed from wishlist successfully' };
  } catch (error) {
    console.error('Error deleting from wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default deleteWishlist;