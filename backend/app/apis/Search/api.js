import express from 'express';
import { searchSkus } from './logic.js';

const router = express.Router();

/**
 * @openapi
 * /api/search:
 *   get:
 *     summary: Search SKUs by brand name or description.
 *     description: Returns SKUs matching the search query based on brand name or description.
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query entered by the user.
 *     responses:
 *       200:
 *         description: Successfully retrieved search results.
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
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const result = await searchSkus(query);
    res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    console.error('Error in /api/search endpoint:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
