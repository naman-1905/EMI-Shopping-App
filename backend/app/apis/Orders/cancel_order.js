import { runQuery } from '../../utility/db.js';

/**
 * Cancels an order
 * @param {string} order_id - Order ID
 * @param {string} reason_of_cancellation - Reason for cancellation
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function cancelOrder(order_id, reason_of_cancellation) {
  try {
    if (!order_id) {
      return {
        success: false,
        message: 'Order ID is required',
      };
    }

    await runQuery(async (supabase) => {
      const { error } = await supabase
        .from('order_sku')
        .update({
          cancel: true,
          reason_of_cancellation: reason_of_cancellation || 'No reason provided',
        })
        .eq('order_id', order_id);

      if (error) {
        throw new Error(error.message);
      }
    });

    return {
      success: true,
      message: 'Order cancelled successfully',
    };
  } catch (err) {
    console.error('Error cancelling order:', err.message);
    return {
      success: false,
      message: err.message || 'Failed to cancel order',
    };
  }
}
