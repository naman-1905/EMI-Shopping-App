import express from 'express';
import { getBestSellingSkus } from './bestselling_skus.js';

const router = express.Router();

/**
 * @openapi
 * /api/bestselling/skus:
 *   get:
 *     summary: Get all best-selling SKUs with their images.
 *     description: Returns all SKU information for SKUs with `best_selling = true`, including `product_image_1_url`.
 *     tags:
 *       - BestSelling
 *     responses:
 *       200:
 *         description: Successfully retrieved best-selling SKUs.
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
 */
router.get('/skus', async (req, res) => {
  try {
    const result = await getBestSellingSkus();
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    console.error('Error in /skus endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
