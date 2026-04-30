import { LockKeyhole } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuthStore } from '../stores/authStore'

type LoginErrors = {
  email?: string
  password?: string
}

function validateLogin(email: string, password: string) {
  const errors: LoginErrors = {}

  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid work email.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const clearError = useAuthStore((state) => state.clearError)
  const error = useAuthStore((state) => state.error)
  const initialized = useAuthStore((state) => state.initialized)
  const isLoading = useAuthStore((state) => state.isLoading)
  const login = useAuthStore((state) => state.login)
  const user = useAuthStore((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const redirectTo = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null

    return state?.from?.pathname ?? '/'
  }, [location.state])

  useEffect(() => {
    clearError()
  }, [clearError])

  if (initialized && user) {
    return <Navigate replace to={redirectTo} />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateLogin(email, password)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch {
      // The store maps Firebase errors into user-facing copy.
    }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-icon" aria-hidden="true">
          <LockKeyhole size={22} />
        </div>
        <div>
          <p className="eyebrow">Secure access</p>
          <h1>Sign in to CareFlow</h1>
          <p className="muted">Use your care team account to access patient operations.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error ? <div className="form-alert">{error}</div> : null}
          <Input
            autoComplete="email"
            error={errors.email}
            label="Work email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value)
              clearError()
            }}
            placeholder="clinician@careflow.health"
            value={email}
          />
          <Input
            autoComplete="current-password"
            error={errors.password}
            label="Password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value)
              clearError()
            }}
            placeholder="Password"
            type="password"
            value={password}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Signing in...' : 'Continue'}
          </Button>
        </form>
      </Card>
    </main>
  )
}
