import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={cn('btn', `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  )
}
