import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  PieChart as PieIcon,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import CategoryIcon from '../ui/CategoryIcon'
import { useTransactions } from '../../context/TransactionContext'

export default function AnalyticsTab() {
  const { stats, transactions } = useTransactions()

  const formatCurrency = (val) => '₹' + (val || 0).toLocaleString('en-IN')

  // Calculate Key Financial Metrics
  const income = stats.totalIncome || 0
  const expense = stats.totalExpense || 0
  const savings = Math.max(0, income - expense)
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0

  const daysInMonth = new Date().getDate() || 1
  const dailyAverage = Math.round(stats.monthlyExpense / daysInMonth)

  const topCategory = stats.categoryBreakdown?.[0] || null

  // Palette for Pie Chart
  const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#64748B']

  // Category Pie Chart data
  const pieData = (stats.categoryBreakdown || []).map((cat) => ({
    name: cat.category,
    value: cat.amount,
  }))

  // Income vs Expense comparison data
  const comparisonData = [
    {
      name: 'This Month',
      Income: stats.monthlyIncome,
      Expense: stats.monthlyExpense,
    },
    {
      name: 'Lifetime',
      Income: stats.totalIncome,
      Expense: stats.totalExpense,
    },
  ]

  // Weekly data
  const weeklyData = (stats.weeklyBreakdown || []).map((w) => ({
    name: w.week,
    amount: w.amount,
  }))

  // Export full financial summary to CSV
  const handleExportSummaryCSV = () => {
    if (!transactions.length) return

    const summary = [
      ['Metric', 'Value'],
      ['Total Income', stats.totalIncome],
      ['Total Expense', stats.totalExpense],
      ['Current Balance', stats.balance],
      ['Monthly Income', stats.monthlyIncome],
      ['Monthly Expense', stats.monthlyExpense],
      ['Savings Rate', `${savingsRate}%`],
      ['Daily Average', dailyAverage],
      [''],
      ['Category Breakdown'],
      ['Category', 'Amount (INR)', 'Percentage'],
      ...(stats.categoryBreakdown || []).map((c) => [c.category, c.amount, `${c.percentage}%`]),
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + summary.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `walletwise_analytics_summary_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const hasData = income > 0 || expense > 0

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
            Financial Analytics & Insights
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Deep dive into your monthly spending allocations, habits, and savings velocity.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleExportSummaryCSV} disabled={!hasData}>
          <Download className="w-4 h-4" />
          <span>Export Financial Report</span>
        </Button>
      </div>

      {/* 4 Financial Key Ratios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5" glow glowColor="blue">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Savings Rate</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-main mt-2">{savingsRate}%</p>
          <p className="text-[11px] text-text-muted mt-2">Target recommended: &ge; 15%</p>
        </Card>

        <Card className="p-5" glow glowColor="green">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Current Savings Buffer</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">{formatCurrency(savings)}</p>
          <p className="text-[11px] text-text-muted mt-2">Unspent allowance reserved</p>
        </Card>

        <Card className="p-5" glow glowColor="violet">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Daily Average Burn</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-2">{formatCurrency(dailyAverage)}</p>
          <p className="text-[11px] text-text-muted mt-2">Over current month cycle</p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Highest Spend Area</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-brand-blue-light mt-2 truncate">
            {topCategory ? topCategory.category : 'None'}
          </p>
          <p className="text-[11px] text-text-muted mt-2">
            {topCategory ? `${formatCurrency(topCategory.amount)} (${topCategory.percentage}%)` : 'No expenses logged'}
          </p>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Income vs Expenses Bar Chart (7 Cols) */}
        <Card className="lg:col-span-7 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-dark-border">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-text-main">Cash Flow: Income vs Outflow</h3>
              <p className="text-xs text-text-muted mt-0.5">Compare total intake against spending</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-dark-secondary text-text-secondary border border-dark-border">
              Comparison
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 rounded-xl bg-dark-card-elevated border border-dark-border shadow-xl text-xs space-y-1">
                            {payload.map((entry, idx) => (
                              <p key={idx} className="font-semibold" style={{ color: entry.color }}>
                                {entry.name}: {formatCurrency(entry.value)}
                              </p>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Income" fill="#10B981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Expense" fill="#EF4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-text-muted">
                No financial transactions recorded yet.
              </div>
            )}
          </div>
        </Card>

        {/* Right: Category Distribution Donut Chart (5 Cols) */}
        <Card className="lg:col-span-5 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-dark-border">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-text-main">Category Distribution</h3>
              <p className="text-xs text-text-muted mt-0.5">Proportional breakdown of expenses</p>
            </div>
            <PieIcon className="w-4 h-4 text-brand-blue-light" />
          </div>

          <div className="h-64 sm:h-72 w-full pt-2 flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-2.5 rounded-xl bg-dark-card-elevated border border-dark-border shadow-xl text-xs">
                            <span className="font-bold text-text-main">{payload[0].name}</span>
                            <p className="text-brand-blue-light font-bold mt-0.5">{formatCurrency(payload[0].value)}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-text-muted">No expenses to distribute yet.</p>
            )}
          </div>
        </Card>
      </div>

      {/* Weekly Breakdown Trend */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-dark-border">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-text-main">Weekly Spending Trend</h3>
            <p className="text-xs text-text-muted mt-0.5">Monitor week-over-week spending pace within this month</p>
          </div>
          <Calendar className="w-4 h-4 text-brand-violet-light" />
        </div>

        <div className="h-56 w-full pt-4">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 rounded-xl bg-dark-card-elevated border border-dark-border shadow-xl text-xs">
                          <p className="text-text-muted">{payload[0].payload.name}</p>
                          <p className="font-bold text-brand-violet-light mt-0.5">{formatCurrency(payload[0].value)}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="amount" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-text-muted">
              Record expenses across the month to view week-by-week distributions.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
