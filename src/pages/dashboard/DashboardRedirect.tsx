import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export default function DashboardRedirect() {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'user') return <Navigate to="/dashboard/user" replace />
  if (user.role === 'professional') return <Navigate to="/dashboard/professional" replace />
  if (user.role === 'admin') return <Navigate to="/dashboard/admin" replace />
  if (user.role === 'support') return <Navigate to="/dashboard/support" replace />
  return <Navigate to="/" replace />
}

