import { runQuery, tables } from '../../utility/db.js';

async function fetchWishlist(userId) {
  try {
    if (!userId) {
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
        AND up.wishlist = true
      ORDER BY si.sku_name
    `
    const { rows } = await runQuery(query, [userId])

    return { 
      success: true, 
      data: rows, 
      message: 'Wishlist items retrieved successfully' 
    };
  } catch (error) {
    console.error('Error fetching wishlist:', error.message);
    return { success: false, message: error.message };
  }
}

export default fetchWishlist;
