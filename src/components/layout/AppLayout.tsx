import { Activity, BarChart3, HeartPulse, LayoutDashboard, LogOut, UsersRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../stores/authStore'

type AppLayoutProps = {
  children: ReactNode
}

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/patients', icon: UsersRound, label: 'Patients' },
]

export function AppLayout({ children }: AppLayoutProps) {
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink aria-label="CareFlow home" className="brand" to="/">
          <span className="brand-mark">
            <HeartPulse size={22} strokeWidth={2.2} />
          </span>
          <span>
            <strong>CareFlow</strong>
            <small>Provider OS</small>
          </span>
        </NavLink>

        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink className="nav-link" key={item.href} to={item.href}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span>{user?.displayName ?? 'Care team'}</span>
            <small>{user?.email}</small>
          </div>
          <Button aria-label="Sign out" onClick={() => void logout()} title="Sign out" type="button" variant="ghost">
            <LogOut size={18} />
            <span>Sign out</span>
          </Button>
          <div className="sidebar-status">
            <Activity size={18} />
            <span>Care network stable</span>
          </div>
        </div>
      </aside>

      <main className="workspace">{children}</main>
    </div>
  )
}
