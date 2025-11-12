import { runQuery, tables } from '../../utility/db.js';

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

    const query = `
      UPDATE ${tables.orderSku}
      SET
        cancel = true,
        reason_of_cancellation = $2
      WHERE order_id = $1
    `
    await runQuery(query, [order_id, reason_of_cancellation || 'No reason provided']);

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
