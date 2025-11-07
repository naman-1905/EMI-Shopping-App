import { runQuery } from '../../utility/db.js';

/**
 * Retrieves categories with special tags and their featured images.
 * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
 */
export async function getFeaturedCategories() {
  try {
    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('sku_info')
        .select(`
          category,
          sku_image_handler(featured_image_url)
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
