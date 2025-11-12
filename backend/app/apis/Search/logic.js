import { runQuery, tables } from '../../utility/db.js';

/**
 * Searches SKUs based on brand name, description, or SKU name.
 * @param {string} query - The search query entered by the user.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function searchSkus(query) {
  try {
    if (!query || query.trim() === '') {
      return {
        success: false,
        message: 'Search query cannot be empty.',
      };
    }

    const sanitizedQuery = query.trim()
    const likeQuery = `%${sanitizedQuery}%`
    const sql = `
      SELECT *
      FROM ${tables.skuInfo}
      WHERE sku_brand ILIKE $1
        OR sku_description ILIKE $1
        OR sku_name ILIKE $1
    `
    const { rows } = await runQuery(sql, [likeQuery])

    return {
      success: true,
      data: rows,
      message: 'Search results retrieved successfully.',
    };
  } catch (err) {
    console.error('Error performing search:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to perform search.',
    };
  }
}
