import { runQuery } from '../../utility/db.js';

/**
 * Fetches all orders for a user
 * @param {string} uid - User ID
 * @returns {Promise<{success: boolean, data?: object[], message?: string}>}
 */
export async function getAllOrders(uid) {
  try {
    if (!uid) {
      return {
        success: false,
        message: 'User ID is required',
      };
    }

    const orders = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('order_sku')
        .select(`
          order_id,
          uid,
          ad_id,
          sku_id,
          ordered_on,
          ex_delivery_date,
          cash,
          mutual_fund_emi,
          emi,
          planned_month,
          quantity,
          final_price,
          cancel,
          reason_of_cancellation,
          sku_info(sku_id, sku_name, price),
          user_address(ad_id, state, city, pincode, phone_number)
        `)
        .eq('uid', uid)
        .order('ordered_on', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    });

    return {
      success: true,
      data: orders || [],
      message: 'Orders retrieved successfully',
    };
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to fetch orders',
    };
  }
}
