import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, CheckCircle2, TrendingUp, Laptop, Coffee, Sparkles, BookOpen, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function Hero({ onGetStarted, onNavigate }) {
  const { isAuthenticated } = useAuth()

  const handleDiscover = (e) => {
    e.preventDefault()
    const target = document.querySelector('#features')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-dark">
      {/* Precision grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      {/* Controlled emerald subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modern Student Financial Ledger</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-text-main"
            >
              Master Your Money.<br />
              <span className="text-emerald-400">Pace Your Allowance.</span><br />
              Graduate Debt-Free.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
            >
              WalletWise gives students complete visibility into daily campus cash flow, budget pacing warnings, and savings goals—without cumbersome spreadsheets.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('dashboard')}
                >
                  <span>Open Your Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('register')}
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              <Button
                variant="secondary"
                size="lg"
                onClick={handleDiscover}
              >
                <span>Explore Features</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </Button>
            </motion.div>

            {/* Value Micro-list */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero complex spreadsheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant expense logging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% private & secure</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Fintech Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Main Ledger Preview Card */}
              <div className="rounded-xl border border-dark-border bg-dark-card p-6 shadow-2xl space-y-5">

                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ₹
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Monthly Allowance</p>
                      <p className="text-2xl font-extrabold font-mono tabular-nums text-text-main">₹15,000</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    On Track &bull; Day 19
                  </div>
                </div>

                {/* Pacing Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono tabular-nums text-text-muted">
                    <span>Spent: <strong className="text-text-main">₹6,240</strong></span>
                    <span>Buffer: <strong className="text-emerald-400">₹8,760</strong></span>
                  </div>
                  <div className="w-full bg-dark-secondary h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '41.6%' }} />
                  </div>
                </div>

                {/* Ledger Item Rows */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Recent Verified Entries</p>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-secondary/60 border border-dark-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-emerald-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-main">Semester Allowance</p>
                        <p className="text-[10px] text-text-muted">Monthly Inflow &bull; UPI</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">+₹15,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-secondary/60 border border-dark-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-text-muted">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-main">Academic Course Materials</p>
                        <p className="text-[10px] text-text-muted">Education &bull; Debit Card</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-text-main">-₹1,450</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-secondary/60 border border-dark-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center text-text-muted">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-main">Campus Canteen</p>
                        <p className="text-[10px] text-text-muted">Food & Drinks &bull; UPI</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-text-main">-₹180</span>
                  </div>
                </div>

                {/* Micro Metric Banner */}
                <div className="pt-3 border-t border-dark-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-text-muted">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Real-time DB Connection</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-semibold">Live Pacing Active</span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
