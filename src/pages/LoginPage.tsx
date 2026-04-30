import { LockKeyhole } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-icon" aria-hidden="true">
          <LockKeyhole size={22} />
        </div>
        <div>
          <p className="eyebrow">Secure access</p>
          <h1>Sign in to CareFlow</h1>
          <p className="muted">Firebase authentication will be connected in the authentication slice.</p>
        </div>

        <form className="auth-form">
          <Input autoComplete="email" label="Work email" name="email" placeholder="clinician@careflow.health" />
          <Input autoComplete="current-password" label="Password" name="password" placeholder="Password" type="password" />
          <Button type="button">Continue</Button>
        </form>
      </Card>
    </main>
  )
}
