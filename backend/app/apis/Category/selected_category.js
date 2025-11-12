import { runQuery, tables } from '../../utility/db.js'

/**
 * Retrieves all SKU items for a specific category
 * @param {string} category - The category name to filter by
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getItemsByCategory(category) {
  try {
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return {
        success: false,
        message: 'Invalid category provided',
      }
    }

    const sanitizedCategory = category.trim()
    const query = `
      SELECT 
        si.*,
        CASE 
          WHEN sih.sku_id IS NULL THEN NULL
          ELSE json_build_object(
            'banner_image_url', sih.banner_image_url,
            'featured_image_url', sih.featured_image_url,
            'product_image_1_url', sih.product_image_1_url
          )
        END AS sku_image_handler
      FROM ${tables.skuInfo} si
      LEFT JOIN ${tables.skuImageHandler} sih ON si.sku_id = sih.sku_id
      WHERE si.category = $1
      ORDER BY si.sku_name
    `
    const { rows } = await runQuery(query, [sanitizedCategory])

    return {
      success: true,
      data: rows,
      message: `Items for category "${sanitizedCategory}" retrieved successfully`,
    }
  } catch (err) {
    console.error(`Error fetching items for category "${category}":`, err.message)
    return {
      success: false,
      message: err.message || 'Failed to fetch items for category',
    }
  }
}
