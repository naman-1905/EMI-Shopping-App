import { runQuery } from '../../utility/db.js';

/**
 * Creates a new order
 * @param {string} uid - User ID
 * @param {string} ad_id - Address ID
 * @param {string} sku_id - SKU ID
 * @param {Date} ex_delivery_date - Expected delivery date
 * @param {boolean} cash - Cash payment flag
 * @param {boolean} mutual_fund_emi - Mutual fund EMI flag
 * @param {boolean} emi - EMI flag
 * @param {number} planned_month - Number of months for EMI
 * @param {number} quantity - Quantity ordered
 * @param {number} final_price - Final price
 * @returns {Promise<{success: boolean, order_id?: string, message?: string}>}
 */
export async function createOrder(uid, ad_id, sku_id, ex_delivery_date, cash, mutual_fund_emi, emi, planned_month, quantity, final_price) {
  try {
    if (!uid || !ad_id || !sku_id) {
      return {
        success: false,
        message: 'User ID, Address ID, and SKU ID are required',
      };
    }

    const result = await runQuery(async (supabase) => {
      const { data, error } = await supabase
        .from('order_sku')
        .insert([
          {
            uid,
            ad_id,
            sku_id,
            ex_delivery_date,
            cash,
            mutual_fund_emi,
            emi,
            planned_month,
            quantity: quantity || 1,
            final_price,
            cancel: false,
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    });

    return {
      success: true,
      order_id: result[0]?.order_id,
      message: 'Order created successfully',
    };
  } catch (err) {
    console.error('Error creating order:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to create order',
    };
  }
}
