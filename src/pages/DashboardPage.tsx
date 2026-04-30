import { BellRing, CalendarCheck, ShieldCheck, UsersRound } from 'lucide-react'
import { Card } from '../components/ui/Card'

const metrics = [
  { icon: UsersRound, label: 'Active patients', value: '1,284', trend: '+8.4%' },
  { icon: CalendarCheck, label: 'Appointments today', value: '86', trend: '+12' },
  { icon: ShieldCheck, label: 'Care gaps closed', value: '73%', trend: '+5.1%' },
  { icon: BellRing, label: 'Alerts pending', value: '14', trend: '-3' },
]

export function DashboardPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Home / Dashboard</p>
          <h1>Clinical operations overview</h1>
        </div>
        <p className="muted">A compact command view for patient activity, risk signals, and care team work.</p>
      </header>

      <section className="metric-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card className="metric-card" key={metric.label}>
              <div className="metric-icon">
                <Icon size={20} />
              </div>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.trend}</small>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
