import React from 'react'
import SupabaseTest from './SupabaseTest'

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome to Margin Minder. Use the navigation to log trades or add charts.</p>
      <SupabaseTest />
    </div>
  )
}

export default Dashboard