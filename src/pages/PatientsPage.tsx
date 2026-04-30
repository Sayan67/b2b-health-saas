import { Grid2X2, List } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Toggle } from '../components/ui/Toggle'

type PatientView = 'grid' | 'list'

export function PatientsPage() {
  const [view, setView] = useState<PatientView>('grid')

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Patients</p>
          <h1>Patient details</h1>
        </div>
        <Toggle
          ariaLabel="Patient view"
          onChange={setView}
          options={[
            { icon: <Grid2X2 size={16} />, label: 'Grid', value: 'grid' },
            { icon: <List size={16} />, label: 'List', value: 'list' },
          ]}
          value={view}
        />
      </header>

      <Card className="placeholder-panel">
        <h2>{view === 'grid' ? 'Grid view queued' : 'List view queued'}</h2>
        <p className="muted">The patient dataset and responsive detail layouts will be added in the patient slice.</p>
      </Card>
    </div>
  )
}
