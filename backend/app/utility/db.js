import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

/**
 * Creates and returns a Supabase client instance using environment variables.
 * It automatically sets the schema defined in SUPABASE_SCHEMA (default = 'public')
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseSchema = process.env.SUPABASE_SCHEMA 

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables.')
  }

  // Create client
  const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: supabaseSchema },
  })

  return supabase
}


export async function runQuery(queryCallback) {
  const supabase = getSupabaseClient()
  try {
    const result = await queryCallback(supabase)
    return result
  } catch (err) {
    console.error('Database query failed:', err.message)
    throw err
  }
}