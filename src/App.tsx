import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import SearchPage from './pages/SearchPage'
import ProfessionalProfilePage from './pages/ProfessionalProfilePage'
import BookingPage from './pages/BookingPage'
import DashboardRedirect from './pages/dashboard/DashboardRedirect'
import UserDashboard from './pages/dashboard/UserDashboard'
import ProDashboard from './pages/dashboard/ProDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import SupportDashboard from './pages/dashboard/SupportDashboard'
import ProfileSettings from './pages/ProfileSettings'
import NotFound from './pages/NotFound'
import { RequireRole } from './components/auth/RequireRole'
import { Toasts } from './components/ui/Toasts'
import { ErrorBoundary } from './components/system/ErrorBoundary'
import { useAppInit } from './init/useAppInit'

export default function App() {
  useAppInit()
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/professional/:id" element={<ProfessionalProfilePage />} />
            <Route path="/booking/:professionalId" element={<BookingPage />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/dashboard/user" element={<RequireRole role="user"><UserDashboard /></RequireRole>} />
            <Route path="/dashboard/professional" element={<RequireRole role="professional"><ProDashboard /></RequireRole>} />
            <Route path="/dashboard/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
            <Route path="/dashboard/support" element={<RequireRole role="support"><SupportDashboard /></RequireRole>} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toasts />
      </div>
    </ErrorBoundary>
  )
}

