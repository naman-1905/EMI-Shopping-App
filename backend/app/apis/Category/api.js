import express from 'express'
import { getUniqueCategories } from './unique_category.js'
import { getItemsByCategory } from './selected_category.js'

const router = express.Router()

/**
 * @openapi
 * /api/category/unique:
 *   get:
 *     summary: Get all unique categories
 *     description: Returns a list of all unique categories available in the store
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Successfully retrieved unique categories
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
 *                     type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to retrieve categories
 */
router.get('/unique', async (req, res) => {
  try {
    const result = await getUniqueCategories()
    res.status(result.success ? 200 : 500).json(result)
  } catch (err) {
    console.error('Error in /unique endpoint:', err.message)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

/**
 * @openapi
 * /api/category/{categoryName}:
 *   get:
 *     summary: Get all items in a specific category
 *     description: Returns all SKU items for a specified category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The category name to filter by
 *     responses:
 *       200:
 *         description: Successfully retrieved items for the category
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
 *       400:
 *         description: Invalid category provided
 *       500:
 *         description: Failed to retrieve items
 */
router.get('/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params

    if (!categoryName || categoryName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      })
    }

    const result = await getItemsByCategory(categoryName)
    res.status(result.success ? 200 : 500).json(result)
  } catch (err) {
    console.error('Error in /:categoryName endpoint:', err.message)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

export default router
