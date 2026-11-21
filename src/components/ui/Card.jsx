import React from 'react'

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  elevated = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl transition-colors duration-150 border ${
        elevated
          ? 'bg-dark-card-elevated border-dark-border shadow-fintech-card'
          : 'bg-dark-card border-dark-border shadow-fintech-subtle'
      } ${hoverEffect ? 'hover:border-dark-border-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
