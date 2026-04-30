import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ className, error, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="field" htmlFor={inputId}>
      <span>{label}</span>
      <input
        aria-invalid={Boolean(error)}
        className={cn('input', error && 'input-error', className)}
        id={inputId}
        {...props}
      />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}
