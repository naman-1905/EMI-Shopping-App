import { runQuery, tables } from '../../utility/db.js';

async function insertWishlist(userId, skuId) {
  try {
    if (!userId || !skuId) {
      return {
        success: false,
        message: 'User ID and SKU ID are required',
      };
    }

    const query = `
      INSERT INTO ${tables.userPreference} (user_id, sku_id, wishlist)
      VALUES ($1, $2, true)
      ON CONFLICT (user_id, sku_id)
      DO UPDATE SET wishlist = true
    `
    await runQuery(query, [userId, skuId]);

    return { success: true, message: 'Item added to wishlist successfully' };
  } catch (error) {
    console.error('Error inserting into wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default insertWishlist;
