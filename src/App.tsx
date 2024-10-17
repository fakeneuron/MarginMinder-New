import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { supabase, initializeDatabase } from './supabaseClient'
import Header from './components/Header'
import Trades from './pages/Trades'
import Charts from './pages/Charts'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Auth from './pages/Auth'
import EconomicCalendar from './pages/EconomicCalendar';

const App: React.FC = () => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeDatabase()
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    initApp()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header session={session} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!session ? <Auth /> : <Navigate to="/" />} />
            <Route path="/" element={session ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/trades" element={session ? <Trades /> : <Navigate to="/login" />} />
            <Route path="/charts" element={session ? <Charts /> : <Navigate to="/login" />} />
            <Route path="/user" element={session ? <User /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App