import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BarChart2, LineChart, User as UserIcon, Home, LogOut } from 'lucide-react'
import { supabase } from '../supabaseClient'
import logo from '../assets/logo.png'


interface HeaderProps {
  session: any
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const navigate = useNavigate()
  const location = useLocation(); 

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/"> 
            <img src={logo} alt="Margin Minder Logo" className="h-8" /> 
          </Link>
          {session ? (
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    to="/trades" 
                    className={`flex items-center hover:text-blue-200 relative`} 
                  >
                    <BarChart2 className="mr-1" size={18} />
                    Trades
                    {location.pathname === '/trades' && ( 
                      <span className="absolute inset-0 bg-blue-800 rounded-md px-7 py-4 z-[-1] -ml-3 -mt-2 -mr-3 -mb-2"></span> 
                    )}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/charts" 
                    className={`flex items-center hover:text-blue-200 relative`}
                  >
                    <LineChart className="mr-1" size={18} />
                    Charts
                    {location.pathname === '/charts' && (
                      <span className="absolute inset-0 bg-blue-800 rounded-md px-7 py-4 z-[-1] -ml-3 -mt-2 -mr-3 -mb-2"></span> 
                    )}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/" 
                    className={`flex items-center hover:text-blue-200 relative`}
                  >
                    <Home className="mr-1" size={18} />
                    Dashboard
                    {location.pathname === '/' && (
                      <span className="absolute inset-0 bg-blue-800 rounded-md px-7 py-4 z-[-1] -ml-3 -mt-2 -mr-3 -mb-2"></span> 
                    )}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/user" 
                    className={`flex items-center hover:text-blue-200 relative`}
                  >
                    <UserIcon className="mr-1" size={18} />
                    User
                    {location.pathname === '/user' && (
                      <span className="absolute inset-0 bg-blue-800 rounded-md px-7 py-4 z-[-1] -ml-3 -mt-2 -mr-3 -mb-2"></span> 
                    )}
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