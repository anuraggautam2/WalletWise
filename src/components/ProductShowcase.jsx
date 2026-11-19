import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, Calendar, Coffee, BookOpen, Train, Wifi, Info, Sparkles } from 'lucide-react'
import Button from './ui/Button'

export default function ProductShowcase({ onGetStarted, onNavigate }) {
  const transactions = [
    { name: 'University Bookstore', cat: 'Books & Academics', icon: BookOpen, date: 'Oct 16, 2:40 PM', amount: '-₹850', color: 'text-brand-violet-light', bg: 'bg-purple-500/15' },
    { name: 'Campus Central Canteen', cat: 'Food & Dining', icon: Coffee, date: 'Oct 16, 1:15 PM', amount: '-₹120', color: 'text-brand-blue-light', bg: 'bg-blue-500/15' },
    { name: 'Metro Card Auto-Topup', cat: 'Transit', icon: Train, date: 'Oct 15, 6:30 PM', amount: '-₹400', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
    { name: 'Room Wi-Fi Contribution', cat: 'Hostel & Utilities', icon: Wifi, date: 'Oct 14, 11:00 AM', amount: '-₹250', color: 'text-amber-400', bg: 'bg-amber-500/15' },
  ]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-dark-secondary/60 border-y border-dark-border">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Platform Preview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
            A dashboard crafted for <span className="text-brand-blue-light">clarity</span>, not complexity.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            See how your entire financial picture organizes into a calm, readable overview that keeps you ahead of your budget.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-text-muted bg-dark-card border border-dark-border mt-2">
            <Info className="w-3.5 h-3.5 text-text-subtle" />
            <span>Illustrative preview &bull; Connect your free student account to record your live records</span>
          </div>
        </div>

        {/* Dashboard Shell Mockup */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-dark-border bg-dark-card"
        >
          {/* Window Chrome Bar */}
          <div className="px-4 py-3 flex items-center justify-between bg-dark-secondary/80 border-b border-dark-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/40 inline-block" />
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-lg text-xs text-text-muted font-mono bg-dark-card border border-dark-border">
              <span className="text-emerald-400 font-bold">&bull;</span>
              <span>app.walletwise.in/dashboard</span>
            </div>

            <span className="text-[11px] text-text-muted font-medium">Demo Preview Workspace</span>
          </div>

          {/* Dashboard Inner Canvas */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-dark-bg/95">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border">
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Welcome back</span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-main">Student Financial Dashboard</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-lg text-text-secondary font-medium flex items-center gap-2 bg-dark-card border border-dark-border">
                  <Calendar className="w-3.5 h-3.5 text-text-muted" />
                  <span>October 2026</span>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('register')}
                >
                  <span>Launch Live App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-dark-card border border-dark-border">
                <span className="text-xs font-medium text-text-muted">Total Spent This Month</span>
                <p className="text-2xl font-bold text-text-main mt-1">₹9,450</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <span>63% of monthly allowance</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-dark-card border border-dark-border">
                <span className="text-xs font-medium text-text-muted">Budget Remaining</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">₹5,550</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400/80">
                  <span>Target limit: ₹15,000</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-dark-card border border-dark-border">
                <span className="text-xs font-medium text-text-muted">Recommended Daily Spend</span>
                <p className="text-2xl font-bold text-text-main mt-1">₹370<span className="text-sm font-normal text-text-muted">/day</span></p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>15 days remaining in cycle</span>
                </div>
              </div>
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Category Breakdown (7 Cols) */}
              <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-dark-card border border-dark-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-text-main">Category Distribution</h4>
                    <span className="text-xs text-text-muted">Active Month</span>
                  </div>

                  {/* Multi-segment Progress Bar */}
                  <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 bg-dark-secondary">
                    <div className="bg-brand-blue h-full" style={{ width: '42%' }} />
                    <div className="bg-brand-violet h-full" style={{ width: '24%' }} />
                    <div className="bg-emerald-500 h-full" style={{ width: '14%' }} />
                    <div className="bg-amber-500 h-full" style={{ width: '12%' }} />
                    <div className="h-full bg-slate-500" style={{ width: '8%' }} />
                  </div>

                  {/* Legend Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    {[
                      { label: 'Food & Dining', val: '₹3,969 (42%)', color: 'bg-brand-blue' },
                      { label: 'Academics', val: '₹2,268 (24%)', color: 'bg-brand-violet' },
                      { label: 'Transit', val: '₹1,323 (14%)', color: 'bg-emerald-500' },
                      { label: 'Hostel & Utilities', val: '₹1,134 (12%)', color: 'bg-amber-500' },
                      { label: 'Leisure & Misc', val: '₹756 (8%)', color: 'bg-slate-500' },
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

                <div className="mt-5 pt-3 border-t border-dark-border text-xs text-text-muted flex items-center justify-between">
                  <span>Pacing indicator:</span>
                  <span className="font-semibold text-emerald-400">On pace for target</span>
                </div>
              </div>

              {/* Recent Activity (5 Cols) */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-dark-card border border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-text-main">Recent Activity</h4>
                  <span className="text-xs text-brand-blue-light font-semibold">View All</span>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx, idx) => {
                    const Icon = tx.icon
                    return (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tx.bg}`}>
                            <Icon className={`w-4 h-4 ${tx.color}`} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-text-main leading-tight">{tx.name}</p>
                            <p className="text-[10px] text-text-muted mt-0.5">{tx.date}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-text-main">{tx.amount}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
