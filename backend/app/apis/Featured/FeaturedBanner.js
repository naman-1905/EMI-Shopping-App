import { runQuery, tables } from '../../utility/db.js';

/**
 * Retrieves categories with special tags and their featured images.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getFeaturedCategories() {
  try {
    const query = `
      SELECT DISTINCT ON (si.category)
        si.category,
        CASE
          WHEN sih.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'featured_image_url', sih.featured_image_url
          )
        END AS sku_image_handler
      FROM ${tables.skuInfo} si
      LEFT JOIN ${tables.skuImageHandler} sih ON si.sku_id = sih.sku_id
      WHERE si.special_tag = true
      ORDER BY si.category, si.sku_id
    `
    const { rows } = await runQuery(query)

    return {
      success: true,
      data: rows || [],
      message: 'Featured categories retrieved successfully.',
    };
  } catch (err) {
    console.error('Error fetching featured categories:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch featured categories.',
    };
  }
}
