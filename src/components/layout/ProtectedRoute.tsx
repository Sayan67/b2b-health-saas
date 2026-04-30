import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const initialized = useAuthStore((state) => state.initialized)
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  if (!initialized) {
    return (
      <main className="auth-page">
        <div className="loading-panel" role="status">
          Checking secure session...
        </div>
      </main>
    )
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return children
}
