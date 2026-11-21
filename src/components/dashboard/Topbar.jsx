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
    overview: { title: 'Dashboard', subtitle: 'Real-time financial status, pacing, and cashflow overview' },
    transactions: { title: 'Transactions Ledger', subtitle: 'Search, filter, and review every recorded expense and income' },
    budgets: { title: 'Budget Pacing', subtitle: 'Monthly allowances, category limits, and spending rate tracking' },
    savings: { title: 'Savings Milestones', subtitle: 'Target funds, deposits, and automated goal progress' },
    analytics: { title: 'Cashflow Analytics', subtitle: 'Category breakdowns, burn rates, and financial reports' },
    settings: { title: 'Account Settings', subtitle: 'Profile identity, display preferences, and credentials' },
  }

  const current = titles[activeTab] || titles.overview

  return (
    <header className="sticky top-0 z-20 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-main hover:bg-dark-card border border-dark-border transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-text-main tracking-tight leading-none">
              {current.title}
            </h1>
            <p className="hidden sm:block text-xs text-text-secondary mt-1">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Income Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenAddModal('income')}
            className="text-emerald-400 hover:text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Add Income</span>
          </Button>

          {/* Quick Expense Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenAddModal('expense')}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
