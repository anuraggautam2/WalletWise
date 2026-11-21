import React from 'react'
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
  PiggyBank,
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
  const { stats, budgets, savingsSummary, formatCurrency, loading } = useTransactions()

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
            {getGreeting()},{' '}
            <span className="text-emerald-400">{user?.name ? user.name.split(' ')[0] : 'Student'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Financial ledger summary for{' '}
            <span className="text-text-main font-semibold">
              {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onOpenAddModal('income')}
            className="text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Add Income</span>
          </Button>
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

      {/* 4 Key Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Available Balance */}
        <Card className="p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Available Balance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-text-main mt-3 tracking-tight">
            {formatCurrency(stats.balance)}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 font-semibold ${stats.balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stats.balance >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {stats.balance >= 0 ? 'Positive net' : 'Deficit'}
            </span>
            <span className="text-text-muted">&bull; Inflow minus outflow</span>
          </div>
        </Card>

        {/* Card 2: Monthly Income */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Inflow</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-3 tracking-tight">
            {formatCurrency(stats.monthlyIncome)}
          </p>
          <p className="mt-3 text-xs text-text-muted">Allowances, scholarships & earnings</p>
        </Card>

        {/* Card 3: Monthly Expenses */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Outflow</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-rose-400 mt-3 tracking-tight">
            {formatCurrency(stats.monthlyExpense)}
          </p>
          <p className="mt-3 text-xs text-text-muted">Total student spending this month</p>
        </Card>

        {/* Card 4: Monthly Budget */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Budget Target</span>
            <div className="w-8 h-8 rounded-lg bg-dark-secondary border border-dark-border text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-extrabold font-mono tabular-nums text-text-main tracking-tight">
              {budgetAmount > 0 ? formatCurrency(budgetAmount) : 'Not set'}
            </p>
            {budgetAmount > 0 && (
              <span className={`text-xs font-bold font-mono tabular-nums ${budgetPercent >= 100 ? 'text-rose-400' : budgetPercent >= 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {budgetPercent}% used
              </span>
            )}
          </div>
          {budgetAmount > 0 ? (
            <div className="mt-3 space-y-1.5">
              <div className="w-full bg-dark-secondary h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    budgetPercent >= 100 ? 'bg-rose-500' : budgetPercent >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-text-muted font-mono tabular-nums">
                <span>Spent: {formatCurrency(budgetSpent)}</span>
                <span className="text-emerald-400 font-medium">Left: {formatCurrency(budgetRemaining)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigateTab('budgets')}
              className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline block"
            >
              Set monthly budget &rarr;
            </button>
          )}
        </Card>
      </div>

      {/* Savings Goal Quick Overview Banner */}
      <Card className="p-4 sm:p-5 border-emerald-500/20 bg-dark-card hover:border-emerald-500/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-text-main">Savings Goals</h4>
                {savingsSummary.totalGoals > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono tabular-nums">
                    {savingsSummary.overallPercentage}% funded
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                {savingsSummary.totalGoals > 0
                  ? `${formatCurrency(savingsSummary.totalSaved)} saved across ${savingsSummary.totalGoals} goals (${savingsSummary.completedGoals} completed)`
                  : 'Track targets for tuition, gadgets, travel, or an emergency reserve'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savingsSummary.totalGoals > 0 && (
              <div className="hidden md:block w-36 bg-dark-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, savingsSummary.overallPercentage)}%` }}
                />
              </div>
            )}
            <button
              onClick={() => onNavigateTab('savings')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>{savingsSummary.totalGoals > 0 ? 'Manage Goals' : 'Create First Goal'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Middle Grid: Spending Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recharts Spending Curve (7 Cols) */}
        <Card className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-main">Weekly Spending Rhythm</h3>
                <p className="text-xs text-text-muted mt-0.5">Daily expense allocation over the current week</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-dark-secondary text-text-secondary border border-dark-border font-medium">
                This Week
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              {hasTransactions ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
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
                      tickFormatter={(v) => formatCurrency(v)}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="p-3 rounded-lg bg-dark-card border border-dark-border shadow-xl text-xs">
                              <p className="font-semibold text-text-muted">{payload[0].payload.name}</p>
                              <p className="text-sm font-bold font-mono tabular-nums text-emerald-400 mt-0.5">
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
                      stroke="#10B981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#spendGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-text-muted">
                  <Calendar className="w-10 h-10 text-text-muted mb-2 opacity-40" />
                  <p className="text-sm font-semibold text-text-secondary">No spending data yet</p>
                  <p className="text-xs text-text-muted mt-1 max-w-xs">
                    Record your first expense to visualize your weekly financial curve here.
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
                <p className="text-xs text-text-muted mt-0.5">Allocation by expense type this month</p>
              </div>
              <button
                onClick={() => onNavigateTab('analytics')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>Analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {stats.categoryBreakdown && stats.categoryBreakdown.length > 0 ? (
                stats.categoryBreakdown.slice(0, 5).map((cat, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-dark-secondary/60 border border-dark-border/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category={cat.category} size="sm" />
                        <span className="font-semibold text-text-main">{cat.category}</span>
                      </div>
                      <div className="text-right font-mono tabular-nums">
                        <span className="font-bold text-text-main">{formatCurrency(cat.amount)}</span>
                        <span className="text-text-muted ml-1.5 text-[11px]">({cat.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
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
            <span className="font-bold font-mono text-text-main">{stats.categoryBreakdown?.length || 0}</span>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Recent Activity */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-dark-border">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-text-main">Recent Activity</h3>
          </div>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 transition-colors"
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
                className="py-3 flex items-center justify-between gap-4 hover:bg-dark-secondary/40 px-2 rounded-lg transition-colors"
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
                      <span className="px-1.5 py-0.2 rounded bg-dark-secondary border border-dark-border text-[10px] font-medium">
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xs sm:text-sm font-extrabold font-mono tabular-nums ${tx.type === 'income' ? 'text-emerald-400' : 'text-text-main'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            /* First-time User Empty State */
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-text-main">Welcome to WalletWise</h4>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto mt-1 leading-relaxed">
                Start by recording your first expense or monthly allowance to see your real-time ledger in action.
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
