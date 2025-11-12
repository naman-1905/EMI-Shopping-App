import 'dotenv/config'
import { Pool } from 'pg'

const requiredEnv = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
}

for (const [key, value] of Object.entries(requiredEnv)) {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing or invalid ${key} in environment variables.`)
  }
}

const port = Number(process.env.DB_PORT ?? '5432')
const schemaName = (process.env.DB_SCHEMA ?? 'public').trim()

if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schemaName)) {
  throw new Error('DB_SCHEMA must be a valid PostgreSQL identifier.')
}

const pool = new Pool({
  host: process.env.DB_HOST.trim(),
  port: Number.isNaN(port) ? 5432 : port,
  user: process.env.DB_USER.trim(),
  password: process.env.DB_PASS,
  database: process.env.DB_NAME.trim(),
  max: Number(process.env.DB_POOL_MAX ?? '15'),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? '30000'),
  connectionTimeoutMillis: Number(process.env.DB_CONNECT_TIMEOUT_MS ?? '5000'),
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
        }
      : undefined,
})

process.on('exit', () => pool.end())

const quoteIdentifier = (value) => `"${value.replace(/"/g, '""')}"`

const qualifiedTable = (name) => `${quoteIdentifier(schemaName)}.${quoteIdentifier(name)}`

export const tables = {
  skuInfo: qualifiedTable('sku_info'),
  skuImageHandler: qualifiedTable('sku_image_handler'),
  skuPriceBuyingOptionInfo: qualifiedTable('sku_price_buying_option_info'),
  userInfo: qualifiedTable('user_info'),
  userPreference: qualifiedTable('user_preference'),
  userAddress: qualifiedTable('user_address'),
  orderSku: qualifiedTable('order_sku'),
}

/**
 * Executes a SQL query using the global connection pool.
 * @param {string} text - The SQL text to execute.
 * @param {Array<any>} [params=[]] - Parameters that will be bound to the query.
 * @returns {Promise<import('pg').QueryResult<any>>}
 */
export async function runQuery(text, params = []) {
  try {
    return await pool.query(text, params)
  } catch (err) {
    console.error('Database query failed:', err.message)
    throw err
  }
}
