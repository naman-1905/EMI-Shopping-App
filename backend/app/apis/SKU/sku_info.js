import { runQuery, tables } from '../../utility/db.js';

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

    const query = `
      SELECT
        si.*,
        CASE
          WHEN sih.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'product_image_1_url', sih.product_image_1_url
          )
        END AS sku_image_handler,
        CASE
          WHEN sp.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'mutual_fund_emi', sp.mutual_fund_emi,
            'emi', sp.emi,
            'emi_3_month', sp.emi_3_month,
            'emi_6_month', sp.emi_6_month,
            'emi_9_month', sp.emi_9_month,
            'emi_12_month', sp.emi_12_month,
            'emi_18_month', sp.emi_18_month,
            'emi_24_month', sp.emi_24_month,
            'emi_36_month', sp.emi_36_month,
            'emi_48_month', sp.emi_48_month,
            'emi_60_month', sp.emi_60_month,
            'offer', sp.offer,
            'offer_value', sp.offer_value,
            'offer_description', sp.offer_description
          )
        END AS sku_price_buying_option_info
      FROM ${tables.skuInfo} si
      LEFT JOIN ${tables.skuImageHandler} sih ON si.sku_id = sih.sku_id
      LEFT JOIN ${tables.skuPriceBuyingOptionInfo} sp ON si.sku_id = sp.sku_id
      WHERE si.sku_id = $1
      LIMIT 1
    `
    const { rows } = await runQuery(query, [skuId])
    const data = rows[0]

    if (!data) {
      throw new Error('SKU not found')
    }

    return {
      success: true,
      data,
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
