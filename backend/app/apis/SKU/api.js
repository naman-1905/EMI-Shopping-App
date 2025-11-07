import express from 'express';
import { getSkuInfoById } from './sku_info.js';

const router = express.Router();

/**
 * @openapi
 * /api/sku/info/{skuId}:
 *   get:
 *     summary: Get SKU information by SKU ID.
 *     description: Returns SKU details, including EMI plans, offers, and `product_image_1_url`, for a specific SKU ID.
 *     tags:
 *       - SKU
 *     parameters:
 *       - in: path
 *         name: skuId
 *         required: true
 *         schema:
 *           type: string
 *         description: The SKU ID to fetch details for.
 *     responses:
 *       200:
 *         description: Successfully retrieved SKU information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 */
router.get('/info/:skuId', async (req, res) => {
  try {
    const { skuId } = req.params;
    const result = await getSkuInfoById(skuId);
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    console.error('Error in /info/:skuId endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;