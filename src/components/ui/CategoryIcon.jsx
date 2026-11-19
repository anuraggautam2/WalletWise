import React from 'react'
import {
  Utensils,
  Train,
  BookOpen,
  ShoppingBag,
  Film,
  Home,
  Zap,
  HeartPulse,
  Wallet,
  Award,
  Briefcase,
  Laptop,
  Tag,
} from 'lucide-react'

export const categoryMeta = {
  Food: { icon: Utensils, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  Travel: { icon: Train, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  Education: { icon: BookOpen, color: 'text-brand-blue-light', bg: 'bg-blue-500/10 border-blue-500/20' },
  Shopping: { icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
  Entertainment: { icon: Film, color: 'text-brand-violet-light', bg: 'bg-purple-500/10 border-purple-500/20' },
  Accommodation: { icon: Home, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
  Bills: { icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  Healthcare: { icon: HeartPulse, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  // Income categories
  'Monthly Allowance': { icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  Scholarship: { icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  'Part-time Work': { icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  Freelancing: { icon: Laptop, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  Other: { icon: Tag, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' },
}

export default function CategoryIcon({ category, size = 'md', className = '' }) {
  const meta = categoryMeta[category] || categoryMeta.Other
  const Icon = meta.icon

  const sizeMap = {
    sm: 'w-7 h-7 rounded-lg text-xs',
    md: 'w-9 h-9 rounded-xl text-sm',
    lg: 'w-11 h-11 rounded-2xl text-base',
  }

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div
      className={`flex items-center justify-center shrink-0 border ${sizeMap[size] || sizeMap.md} ${meta.bg} ${className}`}
    >
      <Icon className={`${iconSizes[size] || iconSizes.md} ${meta.color}`} />
    </div>
  )
}
