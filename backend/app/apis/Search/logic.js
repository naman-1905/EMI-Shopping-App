import { runQuery } from '../../utility/db.js';

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

    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select('*')
        .or(
          `sku_brand.ilike.%${query}%,sku_description.ilike.%${query}%,sku_name.ilike.%${query}%`
        );

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    });

    return {
      success: true,
      data: result,
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
