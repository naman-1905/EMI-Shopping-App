import { runQuery } from '../../utility/db.js';

/**
 * Retrieves SKU information for a specific SKU ID, including EMI plans, offers, and product image.
 * @param {string} skuId - The SKU ID to fetch details for.
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export async function getSkuInfoById(skuId) {
  try {
    if (!skuId) {
      throw new Error('SKU ID is required');
    }

    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select(`
          *,
          sku_image_handler(product_image_1_url),
          sku_price_buying_option_info(*)
        `)
        .eq('sku_id', skuId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    });

    return {
      success: true,
      data: result,
      message: 'SKU information retrieved successfully.',
    };
  } catch (err) {
    console.error('Error fetching SKU information:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch SKU information.',
    };
  }
}
