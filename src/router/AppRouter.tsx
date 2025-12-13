import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { MemesPage } from '../pages/MemesPage'
import { MemeDetailPage } from '../pages/MemeDetailPage'
import { CartPage } from '../pages/CartPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MainLayout } from '../components/Layout/MainLayout'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/memes" element={<MemesPage />} />
          <Route path="/memes/:id" element={<MemeDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
