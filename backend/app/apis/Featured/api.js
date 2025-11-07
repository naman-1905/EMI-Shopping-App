import express from 'express';
import { getFeaturedCategories } from './FeaturedBanner.js';
import { getAllSpecialTagSkus } from './FeaturedSkus.js';

const router = express.Router();

/**
 * @openapi
 * /api/featured/categories:
 *   get:
 *     summary: Get featured categories with their images.
 *     description: Returns categories with `special_tag` set to true and their `featured_image_url`.
 *     tags:
 *       - Featured
 *     responses:
 *       200:
 *         description: Successfully retrieved featured categories.
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
router.get('/categories', async (req, res) => {
  try {
    const result = await getFeaturedCategories();
    res.status(result.success ? 200 : 500).json(result);
  } catch (err) {
    console.error('Error in /categories endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * @openapi
 * /api/featured/skus:
 *   get:
 *     summary: Get all SKUs with special tags.
 *     description: Returns all SKU information for SKUs with `special_tag` set to true, including `product_image_1_url`.
 *     tags:
 *       - Featured
 *     responses:
 *       200:
 *         description: Successfully retrieved SKUs with special tags.
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
    const result = await getAllSpecialTagSkus();
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