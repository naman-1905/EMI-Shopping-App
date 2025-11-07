import { runQuery } from '../../utility/db.js';

/**
 * Retrieves all SKU information for SKUs with special tags.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getAllSpecialTagSkus() {
  try {
    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select(`
          *,
          sku_image_handler(product_image_1_url)
        `)
        .eq('special_tag', true);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    });

    return {
      success: true,
      data: result,
      message: 'All SKUs with special tags retrieved successfully.',
    };
  } catch (err) {
    console.error('Error fetching SKUs with special tags:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch SKUs with special tags.',
    };
  }
}
