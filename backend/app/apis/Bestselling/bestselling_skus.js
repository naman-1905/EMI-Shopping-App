import { runQuery } from '../../utility/db.js';

/**
 * Retrieves all SKU information for best-selling SKUs.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getBestSellingSkus() {
  try {
    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select(`
          *,
          sku_image_handler(product_image_1_url)
        `)
        .eq('best_selling', true);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    });

    return {
      success: true,
      data: result,
      message: 'Best-selling SKUs retrieved successfully.',
    };
  } catch (err) {
    console.error('Error fetching best-selling SKUs:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch best-selling SKUs.',
    };
  }
}