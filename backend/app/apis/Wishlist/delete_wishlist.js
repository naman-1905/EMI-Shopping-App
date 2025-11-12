import { runQuery, tables } from '../../utility/db.js';

async function deleteWishlist(userId, skuId) {
  try {
    if (!userId || !skuId) {
      return {
        success: false,
        message: 'User ID and SKU ID are required',
      };
    }

    const query = `
      UPDATE ${tables.userPreference}
      SET wishlist = false
      WHERE user_id = $1
        AND sku_id = $2
    `
    await runQuery(query, [userId, skuId]);

    return { success: true, message: 'Item removed from wishlist successfully' };
  } catch (error) {
    console.error('Error deleting from wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default deleteWishlist;
