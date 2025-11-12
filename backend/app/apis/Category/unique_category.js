import { runQuery, tables } from '../../utility/db.js'

/**
 * Retrieves all unique categories from the sku_info table
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getUniqueCategories() {
  try {
    const query = `
      SELECT DISTINCT category
      FROM ${tables.skuInfo}
      WHERE category IS NOT NULL
        AND TRIM(category) <> ''
      ORDER BY category
    `
    const { rows } = await runQuery(query)
    const uniqueCategories = rows.map((row) => row.category).filter(Boolean)

    return {
      success: true,
      data: uniqueCategories,
      message: 'Unique categories retrieved successfully',
    }
  } catch (err) {
    console.error('Error fetching unique categories:', err.message)
    return {
      success: false,
      message: err.message || 'Failed to fetch unique categories',
    }
  }
}
