import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  throw new Error('Supabase configuration is incomplete. Check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const initializeDatabase = async () => {
  try {
    const { data, error } = await supabase
      .from('trades')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error checking trades table:', error.message)
      throw error
    } else {
      console.log('Trades table exists and is accessible')
    }
  } catch (err: any) {
    console.error('Error initializing database:', err.message)
    throw err
  }
}

// Test the connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('trades').select('*', { count: 'exact', head: true })
    if (error) {
      console.error('Supabase connection error:', error.message)
      throw error
    } else {
      console.log('Supabase connection successful, trades count:', data)
    }
  } catch (err: any) {
    console.error('Unexpected error testing Supabase connection:', err.message)
    throw err
  }
}

testConnection()