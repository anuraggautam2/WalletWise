import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, Calendar, Coffee, BookOpen, Train, Wifi, Info, Sparkles, TrendingUp } from 'lucide-react'
import Button from './ui/Button'

export default function ProductShowcase({ onGetStarted, onNavigate }) {
  const transactions = [
    { name: 'University Bookstore', cat: 'Books & Academics', icon: BookOpen, date: 'Oct 16, 2:40 PM', amount: '-₹850' },
    { name: 'Campus Central Canteen', cat: 'Food & Dining', icon: Coffee, date: 'Oct 16, 1:15 PM', amount: '-₹120' },
    { name: 'Metro Card Auto-Topup', cat: 'Transit', icon: Train, date: 'Oct 15, 6:30 PM', amount: '-₹400' },
    { name: 'Hostel Wi-Fi Contribution', cat: 'Hostel & Utilities', icon: Wifi, date: 'Oct 14, 11:00 AM', amount: '-₹250' },
  ]

  return (
    <section id="product" className="py-20 sm:py-28 bg-dark relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Platform Preview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
            A dashboard crafted for <span className="text-emerald-400">clarity</span>, not complexity.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            See how your entire financial picture organizes into a calm, readable overview that keeps you ahead of your budget.
          </p>
        </div>

        {/* Dashboard Shell Mockup */}
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-dark-border bg-dark-card">
          {/* Window Chrome Bar */}
          <div className="px-4 py-3 flex items-center justify-between bg-dark-secondary/80 border-b border-dark-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-md text-xs text-text-muted font-mono bg-dark-card border border-dark-border">
              <span className="text-emerald-400 font-bold">&bull;</span>
              <span>app.walletwise.in/dashboard</span>
            </div>

            <span className="text-[11px] text-text-muted font-medium">Fintech Workspace Preview</span>
          </div>

          {/* Dashboard Inner Canvas */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-dark">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border">
              <div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Active Workspace</span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-main mt-0.5">Student Financial Overview</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1.5 rounded-md text-text-secondary font-medium flex items-center gap-2 bg-dark-card border border-dark-border">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>October 2026</span>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('register')}
                >
                  <span>Launch Live</span>
                </Button>
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div className="p-5 rounded-lg border border-dark-border bg-dark-card">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Available Balance</span>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-text-main mt-2">₹8,760</p>
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+₹15,000 monthly allowance received</span>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-dark-border bg-dark-card">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Outflow</span>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-rose-400 mt-2">₹6,240</p>
                <div className="mt-2 text-xs text-text-muted">
                  <span>Across 4 campus categories</span>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-dark-border bg-dark-card">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Safe Daily Spend</span>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-2">₹417 <span className="text-xs text-text-muted font-sans font-normal">/ day</span></p>
                <div className="mt-2 text-xs text-text-muted">
                  <span>12 days remaining in October</span>
                </div>
              </div>
            </div>

            {/* Recent Verified Ledger */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-dark-border">
                <h4 className="text-sm font-bold text-text-main">Recent Recorded Entries</h4>
                <span className="text-xs text-text-muted">Filtered by: This Month</span>
              </div>

              <div className="divide-y divide-dark-border/60">
                {transactions.map((tx, idx) => {
                  const Icon = tx.icon
                  return (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-dark-secondary border border-dark-border flex items-center justify-center text-text-muted">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-text-main">{tx.name}</p>
                          <p className="text-[11px] text-text-muted">{tx.cat} &bull; {tx.date}</p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-mono text-text-main">{tx.amount}</span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
