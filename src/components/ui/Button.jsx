import React from 'react'
import { motion } from 'framer-motion'
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
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
    icon: 'p-2 rounded-lg',
  }

  const variantClasses = {
    primary: 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-fintech-subtle hover:shadow-fintech-glow-blue border border-brand-blue-light/30',
    secondary: 'bg-dark-card hover:bg-dark-card-elevated text-text-main border border-dark-border hover:border-dark-border-hover shadow-fintech-subtle',
    outline: 'bg-transparent hover:bg-dark-card text-text-secondary hover:text-text-main border border-dark-border hover:border-dark-border-hover',
    ghost: 'bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-main',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40',
    violet: 'bg-brand-violet hover:bg-purple-600 text-white shadow-fintech-subtle hover:shadow-fintech-glow-violet border border-brand-violet-light/30',
  }

  const currentSize = variant === 'icon' ? sizeClasses.icon : sizeClasses[size]
  const currentVariant = variantClasses[variant] || variantClasses.primary

  return (
    <motion.button
      type={type}
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${currentSize} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </motion.button>
  )
}
