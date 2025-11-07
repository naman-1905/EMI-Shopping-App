import { runQuery } from '../../utility/db.js'

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

    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select(`
          *,
          sku_image_handler(banner_image_url, featured_image_url, product_image_1_url)
        `)
        .eq('category', category.trim())

      if (error) {
        throw new Error(error.message)
      }

      return data || []
    })

    return {
      success: true,
      data: result,
      message: `Items for category "${category}" retrieved successfully`,
    }
  } catch (err) {
    console.error(`Error fetching items for category "${category}":`, err.message)
    return {
      success: false,
      message: err.message || 'Failed to fetch items for category',
    }
  }
}
