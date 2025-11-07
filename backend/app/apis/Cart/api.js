import express from 'express';
import { tokenCheck } from './tokencheck.js';
import { insertCart } from './InsertCart.js';
import { deleteCart } from './DeleteCart.js';
import { getAllCartItems } from './AllCartItems.js';

const router = express.Router();

// Middleware to check authentication token
router.use(tokenCheck);

/**
 * @openapi
 * /api/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sku_id
 *             properties:
 *               sku_id:
 *                 type: string
 *                 description: SKU ID of the item to add to the cart
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 */
router.post('/', async (req, res) => {
  const user_id = req.user.uid; // Extract user ID from auth token
  const { sku_id } = req.body;
  const result = await insertCart(user_id, sku_id);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @openapi
 * /api/cart:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sku_id
 *             properties:
 *               sku_id:
 *                 type: string
 *                 description: SKU ID of the item to remove from the cart
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 */
router.delete('/', async (req, res) => {
  const user_id = req.user.uid; // Extract user ID from auth token
  const { sku_id } = req.body;
  const result = await deleteCart(user_id, sku_id);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get all items in the cart
 *     tags:
 *       - Cart
 *     responses:
 *       200:
 *         description: List of items in the cart
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
 *                     properties:
 *                       sku_id:
 *                         type: string
 *                         description: SKU ID of the item in the cart
 *                       sku_name:
 *                         type: string
 *                         description: SKU name
 *                       price:
 *                         type: number
 *                         description: Price of the SKU
 *                       quantity:
 *                         type: number
 *                         description: Quantity available
 *                 message:
 *                   type: string
 */
router.get('/', async (req, res) => {
  const user_id = req.user.uid; // Extract user ID from auth token
  const result = await getAllCartItems(user_id);
  res.status(result.success ? 200 : 400).json(result);
});

export default router;