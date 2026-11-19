import React from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Plus,
  Calendar,
  Sparkles,
  TrendingDown,
  TrendingUp,
  ChevronRight,
  Clock,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import Card from '../ui/Card'
import Button from '../ui/Button'
import CategoryIcon from '../ui/CategoryIcon'
import { useTransactions } from '../../context/TransactionContext'
import { useAuth } from '../../context/AuthContext'

export default function OverviewTab({ onOpenAddModal, onNavigateTab }) {
  const { user } = useAuth()
  const { stats, budgets, loading } = useTransactions()

  const formatCurrency = (val) => {
    return '₹' + (val || 0).toLocaleString('en-IN')
  }

  // Determine greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const overallBudget = budgets.overallBudget
  const budgetAmount = overallBudget ? overallBudget.amount : 0
  const budgetSpent = stats.monthlyExpense || 0
  const budgetRemaining = Math.max(0, budgetAmount - budgetSpent)
  const budgetPercent = budgetAmount > 0 ? Math.min(100, Math.round((budgetSpent / budgetAmount) * 100)) : 0

  // Chart data: daily breakdown
  const chartData = (stats.dailyBreakdown || []).map((d) => ({
    name: d.day,
    amount: d.amount,
  }))

  const hasTransactions = stats.totalIncome > 0 || stats.totalExpense > 0

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
            {getGreeting()},{' '}
            <span className="text-brand-blue-light">{user?.name ? user.name.split(' ')[0] : 'Student'}</span>!
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Here is your financial summary for{' '}
            <span className="text-text-main font-semibold">
              {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenAddModal('income')}
            className="text-emerald-400 border-emerald-500/20"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Add Income</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenAddModal('expense')}
            className="shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </Button>
        </div>
      </div>

      {/* 4 Key Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Available Balance */}
        <Card className="p-5 relative overflow-hidden" glow glowColor="blue">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Available Balance</span>
            <div className="w-8 h-8 rounded-xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-main mt-3 tracking-tight">
            {formatCurrency(stats.balance)}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 font-semibold ${stats.balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stats.balance >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {stats.balance >= 0 ? 'Positive net' : 'Deficit'}
            </span>
            <span className="text-text-muted">&bull; Total income - expenses</span>
          </div>
        </Card>

        {/* Card 2: Monthly Income */}
        <Card className="p-5" glow glowColor="green">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Income</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-3 tracking-tight">
            {formatCurrency(stats.monthlyIncome)}
          </p>
          <p className="mt-3 text-xs text-text-muted">Allowances, scholarships & work</p>
        </Card>

        {/* Card 3: Monthly Expenses */}
        <Card className="p-5" glow glowColor="violet">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Outflow</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-3 tracking-tight">
            {formatCurrency(stats.monthlyExpense)}
          </p>
          <p className="mt-3 text-xs text-text-muted">Total student spending this month</p>
        </Card>

        {/* Card 4: Monthly Budget */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Budget</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-brand-violet-light flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-extrabold text-text-main tracking-tight">
              {budgetAmount > 0 ? formatCurrency(budgetAmount) : 'Not set'}
            </p>
            {budgetAmount > 0 && (
              <span className={`text-xs font-bold ${budgetPercent >= 100 ? 'text-red-400' : budgetPercent >= 80 ? 'text-amber-400' : 'text-brand-blue-light'}`}>
                {budgetPercent}% used
              </span>
            )}
          </div>
          {budgetAmount > 0 ? (
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-dark-secondary h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    budgetPercent >= 100 ? 'bg-red-500' : budgetPercent >= 80 ? 'bg-amber-500' : 'bg-brand-blue'
                  }`}
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-text-muted">
                <span>Spent: {formatCurrency(budgetSpent)}</span>
                <span className="text-emerald-400 font-medium">Left: {formatCurrency(budgetRemaining)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigateTab('budgets')}
              className="mt-3 text-xs font-semibold text-brand-blue-light hover:underline block"
            >
              Set monthly budget &rarr;
            </button>
          )}
        </Card>
      </div>

      {/* Middle Grid: Spending Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recharts Spending Curve (7 Cols) */}
        <Card className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-main">Weekly Spending Rhythm</h3>
                <p className="text-xs text-text-muted mt-0.5">Daily expense allocation over current week</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-dark-secondary text-text-secondary border border-dark-border">
                This Week
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              {hasTransactions ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#64748B"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                    />
                    <YAxis
                      stroke="#64748B"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="p-3 rounded-xl bg-dark-card-elevated border border-dark-border shadow-xl text-xs">
                              <p className="font-semibold text-text-muted">{payload[0].payload.name}</p>
                              <p className="text-sm font-bold text-brand-blue-light mt-0.5">
                                {formatCurrency(payload[0].value)}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#spendGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted">
                  <Calendar className="w-10 h-10 text-text-subtle mb-2" />
                  <p className="text-sm font-semibold text-text-secondary">No spending data yet</p>
                  <p className="text-xs text-text-muted mt-1 max-w-xs">
                    Record your first expense to see your weekly financial curve visualize here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Right: Category Breakdown (5 Cols) */}
        <Card className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-main">Category Breakdown</h3>
                <p className="text-xs text-text-muted mt-0.5">Where your funds go this month</p>
              </div>
              <button
                onClick={() => onNavigateTab('analytics')}
                className="text-xs font-semibold text-brand-blue-light hover:underline flex items-center gap-1"
              >
                <span>Analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {stats.categoryBreakdown && stats.categoryBreakdown.length > 0 ? (
                stats.categoryBreakdown.slice(0, 5).map((cat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-dark-secondary/60 border border-dark-border/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={cat.category} size="sm" />
                        <span className="font-semibold text-text-main">{cat.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-text-main">{formatCurrency(cat.amount)}</span>
                        <span className="text-text-muted ml-1.5 text-[11px]">({cat.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-blue h-1.5 rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-text-muted">
                  <p className="text-xs text-text-muted">No category expenses recorded yet.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-border text-xs text-text-muted flex items-center justify-between">
            <span>Categories tracked:</span>
            <span className="font-bold text-text-main">{stats.categoryBreakdown?.length || 0}</span>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Recent Transactions */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-dark-border">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-brand-blue-light" />
            <h3 className="text-sm sm:text-base font-bold text-text-main">Recent Activity</h3>
          </div>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="text-xs font-semibold text-brand-blue-light hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-dark-border/60">
          {stats.recentTransactions && stats.recentTransactions.length > 0 ? (
            stats.recentTransactions.map((tx) => (
              <div
                key={tx._id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-dark-secondary/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon category={tx.category} size="md" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-main leading-tight">{tx.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted">
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                      <span>&bull;</span>
                      <span>{tx.category}</span>
                      <span>&bull;</span>
                      <span className="px-1.5 py-0.2 rounded bg-dark-secondary border border-dark-border text-[10px]">
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xs sm:text-sm font-extrabold ${tx.type === 'income' ? 'text-emerald-400' : 'text-text-main'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            /* First-time User Empty State */
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-text-main">Welcome to WalletWise!</h4>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto mt-1 leading-relaxed">
                Start by adding your first daily expense or monthly allowance to see your live student dashboard in action.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenAddModal('expense')}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Expense</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
