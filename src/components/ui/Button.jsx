import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2',
    lg: 'text-sm px-5 py-2.5 gap-2.5',
    icon: 'p-2 rounded-lg',
  }

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/20 shadow-sm active:scale-[0.99]',
    secondary: 'bg-dark-secondary hover:bg-dark-card-elevated text-text-main border border-dark-border hover:border-dark-border-hover active:scale-[0.99]',
    outline: 'bg-transparent hover:bg-white/[0.04] text-text-secondary hover:text-text-main border border-dark-border hover:border-dark-border-hover',
    ghost: 'bg-transparent hover:bg-white/[0.05] text-text-secondary hover:text-text-main',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30',
    violet: 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/20 shadow-sm',
  }

  const currentSize = variant === 'icon' ? sizeClasses.icon : sizeClasses[size]
  const currentVariant = variantClasses[variant] || variantClasses.primary

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${currentSize} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 shrink-0" />}
        </>
      )}
    </button>
  )
}
