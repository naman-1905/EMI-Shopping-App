import express from 'express';
import tokenCheck from './tokencheck.js';
import insertWishlist from './insert_wishlist.js';
import deleteWishlist from './delete_wishlist.js';
import fetchWishlist from './fetch_wishlist.js';

const router = express.Router();

/**
 * @openapi
 * /api/wishlist:
 *   post:
 *     summary: Add an item to the wishlist
 *     tags:
 *       - Wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku_id:
 *                 type: string
 *                 description: The SKU ID of the item to add to the wishlist
 *     responses:
 *       200:
 *         description: Item added to wishlist successfully
 *   delete:
 *     summary: Remove an item from the wishlist
 *     tags:
 *       - Wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku_id:
 *                 type: string
 *                 description: The SKU ID of the item to remove from the wishlist
 *     responses:
 *       200:
 *         description: Item removed from wishlist successfully
 *   get:
 *     summary: Fetch all items in the wishlist
 *     tags:
 *       - Wishlist
 *     responses:
 *       200:
 *         description: Wishlist items retrieved successfully
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
 *                       sku_name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       quantity:
 *                         type: number
 *                 message:
 *                   type: string
 */

// Middleware to validate token
router.use(tokenCheck);

// Add item to wishlist
router.post('/', async (req, res) => {
  try {
    const { sku_id } = req.body;
    const result = await insertWishlist(req.user.uid, sku_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove item from wishlist
router.delete('/', async (req, res) => {
  try {
    const { sku_id } = req.body;
    const result = await deleteWishlist(req.user.uid, sku_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch all wishlist items
router.get('/', async (req, res) => {
  try {
    const result = await fetchWishlist(req.user.uid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;