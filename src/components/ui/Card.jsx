import React from 'react'
import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  elevated = false,
  glow = false,
  glowColor = 'blue', // 'blue' | 'violet' | 'green'
  onClick,
  ...props
}) {
  const glowMap = {
    blue: 'hover:shadow-fintech-glow-blue',
    violet: 'hover:shadow-fintech-glow-violet',
    green: 'hover:shadow-fintech-glow-green',
  }

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className={`rounded-2xl transition-all duration-200 border ${
        elevated ? 'bg-dark-card-elevated border-dark-border' : 'bg-dark-card border-dark-border'
      } ${hoverEffect ? `hover:border-dark-border-hover ${glow ? glowMap[glowColor] : 'hover:shadow-fintech-card'}` : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
