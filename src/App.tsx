import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { PatientsPage } from './pages/PatientsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <AppLayout>
            <AnalyticsPage />
          </AppLayout>
        }
      />
      <Route
        path="/patients"
        element={
          <AppLayout>
            <PatientsPage />
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
