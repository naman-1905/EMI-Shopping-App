import express from 'express';
import { tokenCheck } from './tokencheck.js';
import { createOrder } from './create_order.js';
import { getAllOrders } from './all_order.js';
import { cancelOrder } from './cancel_order.js';

const router = express.Router();

// Middleware to validate token
router.use(tokenCheck);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ad_id
 *               - sku_id
 *               - ex_delivery_date
 *               - final_price
 *             properties:
 *               ad_id:
 *                 type: string
 *                 description: Address ID
 *               sku_id:
 *                 type: string
 *                 description: SKU ID
 *               ex_delivery_date:
 *                 type: string
 *                 format: date
 *                 description: Expected delivery date
 *               cash:
 *                 type: boolean
 *                 description: Cash payment flag
 *               mutual_fund_emi:
 *                 type: boolean
 *                 description: Mutual fund EMI flag
 *               emi:
 *                 type: boolean
 *                 description: EMI flag
 *               planned_month:
 *                 type: number
 *                 description: Number of months for EMI
 *               quantity:
 *                 type: number
 *                 description: Quantity ordered
 *               final_price:
 *                 type: number
 *                 description: Final price
 *     responses:
 *       200:
 *         description: Order created successfully
 *   get:
 *     summary: Get all orders for the user
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *   patch:
 *     summary: Cancel an order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: Order ID
 *               reason_of_cancellation:
 *                 type: string
 *                 description: Reason for cancellation
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 */

// Create a new order
router.post('/', async (req, res) => {
  try {
    const uid = req.user.uid;
    const { ad_id, sku_id, ex_delivery_date, cash, mutual_fund_emi, emi, planned_month, quantity, final_price } = req.body;

    const result = await createOrder(uid, ad_id, sku_id, ex_delivery_date, cash, mutual_fund_emi, emi, planned_month, quantity, final_price);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders for the user
router.get('/', async (req, res) => {
  try {
    const uid = req.user.uid;
    const result = await getAllOrders(uid);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel an order
router.patch('/', async (req, res) => {
  try {
    const { order_id, reason_of_cancellation } = req.body;
    const result = await cancelOrder(order_id, reason_of_cancellation);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
