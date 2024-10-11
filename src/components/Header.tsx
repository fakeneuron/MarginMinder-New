import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BarChart2, LineChart, User as UserIcon, Home, LogOut } from 'lucide-react'
import { supabase } from '../supabaseClient'

interface HeaderProps {
  session: any
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">Margin Minder</Link>
          {session ? (
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/trades" className="flex items-center hover:text-blue-200">
                    <BarChart2 className="mr-1" size={18} />
                    Trades
                  </Link>
                </li>
                <li>
                  <Link to="/charts" className="flex items-center hover:text-blue-200">
                    <LineChart className="mr-1" size={18} />
                    Charts
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center hover:text-blue-200">
                    <Home className="mr-1" size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/user" className="flex items-center hover:text-blue-200">
                    <UserIcon className="mr-1" size={18} />
                    User
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:text-blue-200">
                    <LogOut className="mr-1" size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
