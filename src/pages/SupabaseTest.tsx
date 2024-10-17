import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const SupabaseTest: React.FC = () => {
  const [result, setResult] = useState<string>('')

  const testConnection = async () => {
    try {
      const { count, error } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult(`Success! Trades count: ${count}`)
      }
    } catch (err: any) {
      setResult(`Unexpected error: ${err.message}`)
    }
  }

  const addTestTrade = async () => {
    try {
      const { data, error } = await supabase
        .from('trades')
        .insert([
          {
            symbol: 'TEST',
            type: 'buy',
            lotSize: 1,
            price: 100,
            stopLoss: 95, // Added stop loss
            tradeDateTime: new Date().toISOString()
          }
        ])
      
      if (error) {
        setResult(`Error adding test trade: ${error.message}`)
      } else {
        setResult('Test trade added successfully')
      }
    } catch (err: any) {
      setResult(`Unexpected error adding test trade: ${err.message}`)
    }
  }

  return (
    <div className="mt-4">
      <button 
        onClick={testConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Test Supabase Connection
      </button>
      <button 
        onClick={addTestTrade}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Test Trade
      </button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  )
}

export default SupabaseTest