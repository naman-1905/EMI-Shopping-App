import { runQuery } from '../../utility/db.js'

/**
 * Retrieves all unique categories from the sku_info table
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getUniqueCategories() {
  try {
    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select('category')
        .not('category', 'is', null)

      if (error) {
        throw new Error(error.message)
      }

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((item) => item.category))].filter(
        (cat) => cat !== null && cat !== undefined && cat !== ''
      )

      return uniqueCategories
    })

    return {
      success: true,
      data: result,
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
