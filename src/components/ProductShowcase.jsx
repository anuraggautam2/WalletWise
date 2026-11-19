import React from 'react'
import { Wallet, ArrowUpRight, Calendar, Coffee, BookOpen, Train, Wifi, Info } from 'lucide-react'

export default function ProductShowcase({ onGetStarted }) {
  const transactions = [
    { name: 'University Bookstore', cat: 'Books & Academics', icon: BookOpen, date: 'Oct 16, 2:40 PM', amount: '-₹850', color: 'text-brand-violet', bg: 'rgba(167, 139, 250, 0.12)' },
    { name: 'Campus Central Canteen', cat: 'Food & Dining', icon: Coffee, date: 'Oct 16, 1:15 PM', amount: '-₹120', color: 'text-text-accent', bg: 'rgba(37, 99, 235, 0.12)' },
    { name: 'Metro Card Auto-Topup', cat: 'Transit', icon: Train, date: 'Oct 15, 6:30 PM', amount: '-₹400', color: 'text-emerald-400', bg: 'rgba(16, 185, 129, 0.12)' },
    { name: 'Room Wi-Fi Contribution', cat: 'Hostel & Utilities', icon: Wifi, date: 'Oct 14, 11:00 AM', amount: '-₹250', color: 'text-amber-400', bg: 'rgba(245, 158, 11, 0.12)' },
  ]

  const innerStyle = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
  const divider = { borderBottom: '1px solid rgba(255,255,255,0.06)' }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#0D1424' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial-blue opacity-50 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#60A5FA' }}
          >
            Interface Preview
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            A dashboard crafted for <span className="text-text-accent">clarity</span>, not complexity.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            See how your entire financial picture organizes into a calm, readable overview that keeps you ahead of your budget.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-text-muted mt-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Info className="w-3.5 h-3.5 text-text-subtle" />
            <span>Illustrative sample interface &bull; Sample demo dataset for preview purposes only</span>
          </div>
        </div>

        {/* Dashboard Shell */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Window Chrome */}
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.12)' }} />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-lg text-xs text-text-muted font-mono"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-emerald-400 font-bold">&bull;</span>
              <span>app.walletwise.in/dashboard</span>
            </div>
            <span className="text-[11px] text-text-muted font-medium">Demo Workspace</span>
          </div>

          {/* Dashboard Content */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8" style={{ background: '#0A1222' }}>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6" style={divider}>
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Welcome back</span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">Student Financial Dashboard</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-lg text-text-secondary font-medium flex items-center gap-2"
                  style={innerStyle}
                >
                  <Calendar className="w-3.5 h-3.5 text-text-muted" />
                  <span>October 2026</span>
                </span>
                <button type="button" onClick={onGetStarted}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Log Expense</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Spent This Month', value: '₹9,450', sub: '63% of monthly allowance', dotColor: 'bg-brand-blue', valColor: 'text-text-primary' },
                { label: 'Budget Remaining', value: '₹5,550', sub: 'Target limit: ₹15,000', dotColor: '', valColor: 'text-emerald-400' },
                { label: 'Recommended Daily Spend', value: '₹370', valueSuffix: '/day', sub: '15 days remaining in cycle', dotColor: '', valColor: 'text-text-primary' },
              ].map((card, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl" style={innerStyle}>
                  <span className="text-xs font-medium text-text-muted">{card.label}</span>
                  <p className={`text-2xl font-bold mt-1 ${card.valColor}`}>
                    {card.value}
                    {card.valueSuffix && <span className="text-sm font-normal text-text-muted">{card.valueSuffix}</span>}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                    {card.dotColor && <span className={`w-2 h-2 rounded-full ${card.dotColor}`} />}
                    <span>{card.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics + Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Category Breakdown */}
              <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl flex flex-col justify-between" style={innerStyle}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-text-primary">Category Distribution</h4>
                    <span className="text-xs text-text-muted">Active Month</span>
                  </div>

                  {/* Multi-segment bar */}
                  <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="bg-brand-blue h-full" style={{ width: '42%' }} />
                    <div className="bg-brand-violet h-full" style={{ width: '24%' }} />
                    <div className="bg-emerald-500 h-full" style={{ width: '14%' }} />
                    <div className="bg-amber-500 h-full" style={{ width: '12%' }} />
                    <div className="h-full" style={{ width: '8%', background: 'rgba(255,255,255,0.15)' }} />
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    {[
                      { label: 'Food & Dining', val: '₹3,969 (42%)', color: 'bg-brand-blue' },
                      { label: 'Academics', val: '₹2,268 (24%)', color: 'bg-brand-violet' },
                      { label: 'Transit', val: '₹1,323 (14%)', color: 'bg-emerald-500' },
                      { label: 'Hostel & Utilities', val: '₹1,134 (12%)', color: 'bg-amber-500' },
                      { label: 'Leisure & Misc', val: '₹756 (8%)', color: 'bg-slate-400' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                        <div>
                          <p className="text-xs font-medium text-text-secondary">{item.label}</p>
                          <p className="text-[11px] text-text-muted font-bold">{item.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 text-xs text-text-muted flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span>Pacing indicator:</span>
                  <span className="font-semibold text-emerald-400">On pace for target</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl" style={innerStyle}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-text-primary">Recent Activity</h4>
                  <span className="text-xs text-text-accent font-semibold">View All</span>
                </div>
                <div className="space-y-3">
                  {transactions.map((tx, idx) => {
                    const Icon = tx.icon
                    return (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl transition-colors hover:bg-dark-card">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: tx.bg }}>
                            <Icon className={`w-4 h-4 ${tx.color}`} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-text-primary leading-tight">{tx.name}</p>
                            <p className="text-[10px] text-text-muted mt-0.5">{tx.date}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-text-primary">{tx.amount}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
