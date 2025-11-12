import express from 'express';
import { tokenCheck } from './tokencheck.js';
import { insertAddress } from './insert_address.js';
import { updateAddress } from './update_address.js';
import { deleteAddress } from './delete_address.js';
import { runQuery, tables } from '../../utility/db.js';

const router = express.Router();

// Middleware to check authentication token
router.use(tokenCheck);

/**
 * @openapi
 * /api/address:
 *   get:
 *     summary: Get all addresses for a user
 *     tags:
 *       - Address
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get('/', async (req, res) => {
  try {
    const uid = req.user.uid;

    const query = `
      SELECT *
      FROM ${tables.userAddress}
      WHERE uid = $1
      ORDER BY ad_id
    `
    const { rows } = await runQuery(query, [uid])

    const addresses = rows

    res.status(200).json({ success: true, addresses });
  } catch (err) {
    console.error('Error fetching addresses:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
  }
});

/**
 * @openapi
 * /api/address:
 *   post:
 *     summary: Insert a new address
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - state
 *               - city
 *               - pincode
 *               - flat_house
 *               - phone_number
 *               - receivers_name
 *             properties:
 *               state:
 *                 type: string
 *                 description: State
 *               city:
 *                 type: string
 *                 description: City
 *               pincode:
 *                 type: string
 *                 description: Pincode
 *               landmark:
 *                 type: string
 *                 description: Landmark (optional)
 *               flat_house:
 *                 type: string
 *                 description: Flat or house number
 *               phone_number:
 *                 type: string
 *                 description: Phone number
 *               special_address:
 *                 type: string
 *                 description: Special address label (optional)
 *               receivers_name:
 *                 type: string
 *                 description: Receiver's name
 */
router.post('/', async (req, res) => {
  const uid = req.user.uid; // Derive uid from auth token
  const result = await insertAddress(req.body, uid);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @openapi
 * /api/address:
 *   put:
 *     summary: Update an existing address
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ad_id
 *               - state
 *               - city
 *               - pincode
 *               - flat_house
 *               - phone_number
 *               - receivers_name
 *             properties:
 *               ad_id:
 *                 type: string
 *                 description: Address ID
 *               state:
 *                 type: string
 *                 description: State
 *               city:
 *                 type: string
 *                 description: City
 *               pincode:
 *                 type: string
 *                 description: Pincode
 *               landmark:
 *                 type: string
 *                 description: Landmark (optional)
 *               flat_house:
 *                 type: string
 *                 description: Flat or house number
 *               phone_number:
 *                 type: string
 *                 description: Phone number
 *               special_address:
 *                 type: string
 *                 description: Special address label (optional)
 *               receivers_name:
 *                 type: string
 *                 description: Receiver's name
 */
router.put('/', async (req, res) => {
  const uid = req.user.uid; // Derive uid from auth token
  const result = await updateAddress(req.body, uid);
  res.status(result.success ? 200 : 400).json(result);
});

/**
 * @openapi
 * /api/address:
 *   delete:
 *     summary: Delete an address
 *     tags:
 *       - Address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ad_id
 *             properties:
 *               ad_id:
 *                 type: string
 *                 description: Address ID to delete
 */
router.delete('/', async (req, res) => {
  const { ad_id } = req.body;
  const uid = req.user.uid;
  const result = await deleteAddress(ad_id, uid);
  res.status(result.success ? 200 : 400).json(result);
});

export default router;
