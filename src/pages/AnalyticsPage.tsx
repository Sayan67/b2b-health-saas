import { Card } from '../components/ui/Card'

export function AnalyticsPage() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Population health signals</h1>
        </div>
        <p className="muted">Analytics charts and KPI trends will be built in the analytics slice.</p>
      </header>

      <Card className="placeholder-panel">
        <h2>Analytics module queued</h2>
        <p className="muted">This route is ready for chart components, risk distribution, and utilization trends.</p>
      </Card>
    </div>
  )
}
