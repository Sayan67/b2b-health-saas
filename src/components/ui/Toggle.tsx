import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ToggleOption<T extends string> = {
  icon?: ReactNode
  label: string
  value: T
}

type ToggleProps<T extends string> = {
  ariaLabel: string
  onChange: (value: T) => void
  options: Array<ToggleOption<T>>
  value: T
}

export function Toggle<T extends string>({ ariaLabel, onChange, options, value }: ToggleProps<T>) {
  return (
    <div aria-label={ariaLabel} className="toggle" role="group">
      {options.map((option) => (
        <button
          aria-pressed={option.value === value}
          className={cn('toggle-item', option.value === value && 'toggle-item-active')}
          key={option.value}
          onClick={() => onChange(option.value)}
          title={option.label}
          type="button"
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  )
}
