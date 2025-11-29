import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { LogIn, LogOut, UserCircle2 } from 'lucide-react'

export function Header() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container-default flex items-center justify-between h-16">
        <Link to="/" className="font-semibold text-primary-600">Pro Services</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/search" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Browse</NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <NavLink to="/dashboard" className="flex items-center gap-1"><UserCircle2 size={18} /> Dashboard</NavLink>
              <button onClick={logout} className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 hover:bg-gray-200"><LogOut size={18} /> Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="inline-flex items-center gap-1 rounded-md bg-primary-600 text-white px-3 py-1 hover:bg-primary-700"><LogIn size={18} /> Login</NavLink>
              <NavLink to="/register" className="text-primary-600">Register</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

