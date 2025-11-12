import { runQuery, tables } from '../../utility/db.js';

/**
 * Retrieves all SKU information for best-selling SKUs.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getBestSellingSkus() {
  try {
    const query = `
      SELECT
        si.*,
        CASE
          WHEN sih.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'product_image_1_url', sih.product_image_1_url
          )
        END AS sku_image_handler
      FROM ${tables.skuInfo} si
      LEFT JOIN ${tables.skuImageHandler} sih ON si.sku_id = sih.sku_id
      WHERE si.best_selling = true
      ORDER BY si.sku_name
    `
    const { rows } = await runQuery(query)

    return {
      success: true,
      data: rows || [],
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
