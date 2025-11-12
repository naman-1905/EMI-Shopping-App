import { runQuery, tables } from '../../utility/db.js';

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

    const query = `
      SELECT
        o.order_id,
        o.uid,
        o.ad_id,
        o.sku_id,
        o.ordered_on,
        o.ex_delivery_date,
        o.cash,
        o.mutual_fund_emi,
        o.emi,
        o.planned_month,
        o.quantity,
        o.final_price,
        o.cancel,
        o.reason_of_cancellation,
        json_build_object(
          'sku_id', si.sku_id,
          'sku_name', si.sku_name,
          'price', si.price
        ) AS sku_info,
        json_build_object(
          'ad_id', ua.ad_id,
          'state', ua.state,
          'city', ua.city,
          'pincode', ua.pincode,
          'phone_number', ua.phone_number
        ) AS user_address
      FROM ${tables.orderSku} o
      LEFT JOIN ${tables.skuInfo} si ON o.sku_id = si.sku_id
      LEFT JOIN ${tables.userAddress} ua ON o.ad_id = ua.ad_id
      WHERE o.uid = $1
      ORDER BY o.ordered_on DESC
    `
    const { rows } = await runQuery(query, [uid])

    return {
      success: true,
      data: rows,
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
