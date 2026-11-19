import React, { useState } from 'react'
import { Receipt, Sliders, BarChart3, History, FileText, PiggyBank, CheckCircle } from 'lucide-react'

const cardStyle = {
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(14px)',
}
const cardHoverStyle = {
  background: 'rgba(255,255,255,0.065)',
  border: '1px solid rgba(255,255,255,0.15)',
}
const innerStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
}
const dividerStyle = { borderTop: '1px solid rgba(255,255,255,0.06)' }
const barTrack = { background: 'rgba(255,255,255,0.08)' }

function FeatureCard({ children, className = '' }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`rounded-3xl p-7 sm:p-8 shadow-subtle flex flex-col justify-between transition-all duration-300 ${hovered ? 'hover:-translate-y-1 shadow-card' : ''} ${className}`}
      style={hovered ? cardHoverStyle : cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}

export default function Features() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <section id="features" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#101A2D' }}>
      <div className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-radial-blue opacity-40 -z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-radial-violet opacity-30 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#60A5FA' }}
          >
            Core Architecture
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            Engineered for genuine <span className="text-text-accent">student utility</span>.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Every feature is purpose-built to solve real student budgeting friction without tedious bookkeeping complexity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 1. EXPENSE TRACKING - 7 Cols */}
          <FeatureCard className="md:col-span-7">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.15)' }}>
                  <Receipt className="w-5 h-5 text-text-accent stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 01</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Expense Tracking</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                Record, categorize and review daily expenses with zero friction. Tag transactions on the spot as you navigate campus life.
              </p>
            </div>
            <div className="rounded-2xl p-4 sm:p-5 space-y-3" style={innerStyle}>
              <div className="flex items-center justify-between text-xs text-text-muted font-medium pb-2" style={dividerStyle}>
                <span>Recent Quick Logs</span>
                <span className="text-text-accent font-semibold">Instant Categorization</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl flex items-center justify-between" style={innerStyle}>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Canteen Lunch</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#60A5FA' }}>Food & Dining</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">-₹95</span>
                </div>
                <div className="p-3 rounded-xl flex items-center justify-between" style={innerStyle}>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Lab Manual Copy</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#A78BFA' }}>Academics</span>
                  </div>
                  <span className="text-xs font-bold text-text-primary">-₹150</span>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* 2. BUDGET MANAGEMENT - 5 Cols */}
          <FeatureCard className="md:col-span-5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Sliders className="w-5 h-5 text-text-secondary stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 02</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2">Budget Management</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Set spending limits and monitor your budget with active pacing meters that prevent overspending before month-end.
              </p>
            </div>
            <div className="rounded-2xl p-4 space-y-3" style={innerStyle}>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-text-primary">Campus Food: ₹3,100 / ₹4,500</span>
                  <span className="text-text-accent">68%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={barTrack}>
                  <div className="bg-brand-blue h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-text-primary">Transit: ₹680 / ₹1,200</span>
                  <span className="text-emerald-400">56%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={barTrack}>
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '56%' }} />
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* 3. SPENDING ANALYTICS - 6 Cols */}
          <FeatureCard className="md:col-span-6">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.15)' }}>
                  <BarChart3 className="w-5 h-5 text-text-accent stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 03</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2">Spending Analytics</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Understand spending patterns through charts. Discover peak spending days and fine-tune your weekly routines.
              </p>
            </div>
            <div className="rounded-2xl p-4" style={innerStyle}>
              <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                <span>Weekly Outflow Rhythm</span>
                <span className="font-semibold text-text-primary">Avg: ₹320 / day</span>
              </div>
              <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                {[
                  { day: 'Mon', h: '45%' }, { day: 'Tue', h: '60%' }, { day: 'Wed', h: '35%' },
                  { day: 'Thu', h: '50%' }, { day: 'Fri', h: '85%' }, { day: 'Sat', h: '70%' }, { day: 'Sun', h: '40%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div
                      className={`w-full rounded-t-md transition-all duration-200 ${bar.day === 'Fri' ? 'bg-brand-violet' : 'bg-brand-blue opacity-80 group-hover:opacity-100'}`}
                      style={{ height: bar.h }}
                    />
                    <span className="text-[10px] font-medium text-text-muted">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* 4. TRANSACTION HISTORY - 6 Cols */}
          <FeatureCard className="md:col-span-6">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <History className="w-5 h-5 text-text-secondary stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 04</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2">Transaction History</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Review and filter previous transactions. Instantly verify past expenses by category, date range, or payment type.
              </p>
            </div>
            <div className="rounded-2xl p-4 space-y-2.5" style={innerStyle}>
              <div className="flex items-center gap-1.5 pb-2 overflow-x-auto text-xs" style={dividerStyle}>
                {['All', 'Food', 'Academics', 'Travel'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors"
                    style={{
                      background: activeFilter === f ? '#2563EB' : 'rgba(255,255,255,0.05)',
                      color: activeFilter === f ? '#FFF' : '#64748B',
                      border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: 'University Library Fine', date: 'Oct 14 • Academic', amount: '-₹50' },
                  { name: 'Metro Smart Card Recharge', date: 'Oct 12 • Transit', amount: '-₹300' },
                ].map((tx, i) => (
                  <div key={i} className="p-2.5 rounded-lg flex justify-between items-center" style={innerStyle}>
                    <div>
                      <p className="font-semibold text-text-primary">{tx.name}</p>
                      <span className="text-[10px] text-text-muted">{tx.date}</span>
                    </div>
                    <span className="font-bold text-text-primary">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          {/* 5. MONTHLY REPORTS - 5 Cols */}
          <FeatureCard className="md:col-span-5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <FileText className="w-5 h-5 text-text-secondary stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 05</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2">Monthly Reports</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Understand your monthly financial activity. Get clean, consolidated summaries to see where every rupee was allocated.
              </p>
            </div>
            <div className="rounded-2xl p-4 space-y-2 text-xs" style={innerStyle}>
              <div className="flex justify-between items-center pb-2" style={dividerStyle}>
                <span className="font-bold text-text-primary">October Statement</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34D399' }}>Under Budget</span>
              </div>
              <div className="flex justify-between text-text-muted"><span>Total Outflow:</span><strong className="text-text-primary">₹11,420</strong></div>
              <div className="flex justify-between text-text-muted"><span>Top Category:</span><strong className="text-text-primary">Hostel & Mess (44%)</strong></div>
              <div className="flex justify-between text-text-muted"><span>Saved for next month:</span><strong className="text-emerald-400 font-bold">₹1,580</strong></div>
            </div>
          </FeatureCard>

          {/* 6. SAVINGS AWARENESS - 7 Cols */}
          <FeatureCard className="md:col-span-7">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.15)' }}>
                  <PiggyBank className="w-5 h-5 text-text-accent stroke-[2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Feature 06</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Savings Awareness</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                Keep track of your spending and savings goals. Build emergency buffers or save up for tech upgrades and semester trips.
              </p>
            </div>
            <div className="rounded-2xl p-4 sm:p-5" style={innerStyle}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Active Goal</span>
                  <p className="text-sm font-bold text-text-primary">Laptop RAM Upgrade & Supplies</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md" style={{ background: 'rgba(37, 99, 235, 0.12)', color: '#60A5FA' }}>75% Reached</span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-xs text-text-muted">
                  <span>Saved: <strong className="text-text-primary">₹4,500</strong></span>
                  <span>Target: <strong className="text-text-primary">₹6,000</strong></span>
                </div>
                <div className="w-full h-2.5 rounded-full overflow-hidden" style={barTrack}>
                  <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-text-muted">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>On track to complete by November 15</span>
              </div>
            </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  )
}
