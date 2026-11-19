import React from 'react'
import { Menu, Plus, ArrowUpRight, ArrowDownRight, Bell, ShieldCheck } from 'lucide-react'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function Topbar({
  activeTab,
  onOpenMobileMenu,
  onOpenAddModal,
}) {
  const { user } = useAuth()

  const titles = {
    overview: { title: 'Dashboard Overview', subtitle: 'Track your student finances, daily expenses & monthly pacing.' },
    transactions: { title: 'Transactions Log', subtitle: 'Search, filter, and review every recorded expense and income.' },
    budgets: { title: 'Budget Management', subtitle: 'Set spending thresholds to prevent running out before month-end.' },
    analytics: { title: 'Financial Analytics', subtitle: 'Visual reports and spending patterns to optimize your habits.' },
    settings: { title: 'Account Settings', subtitle: 'Manage your student profile, preferences, and security.' },
  }

  const current = titles[activeTab] || titles.overview

  return (
    <header className="sticky top-0 z-20 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-dark-card border border-dark-border transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-main tracking-tight leading-tight">
              {current.title}
            </h1>
            <p className="hidden sm:block text-xs text-text-secondary mt-0.5">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Actions & Live Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Sync Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Sync</span>
          </div>

          {/* Quick Income Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenAddModal('income')}
            className="hidden sm:inline-flex text-emerald-400 hover:text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Income</span>
          </Button>

          {/* Quick Expense Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenAddModal('expense')}
            className="shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Expense</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
