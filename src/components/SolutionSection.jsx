import React, { useState } from 'react'
import { Plus, Check, Layers, Sliders, LineChart, Clock, ArrowRight } from 'lucide-react'

export default function SolutionSection({ onGetStarted }) {
  const [activeCategory, setActiveCategory] = useState('Food & Dining')

  const solutions = [
    { icon: Plus, title: 'Record everyday transactions.', desc: 'Add any expenditure in under 5 seconds with quick amounts and intuitive tags.' },
    { icon: Layers, title: 'Organize expenses into categories.', desc: 'Smart categorizing for campus dining, textbooks, room rent, travel, and personal outings.' },
    { icon: Sliders, title: 'Monitor monthly budgets.', desc: 'Real-time progress bars keep you conscious of how much you can safely spend today.' },
    { icon: LineChart, title: 'Understand spending patterns.', desc: 'Visual category splits immediately show where your cash is concentrating.' },
    { icon: Clock, title: 'Review financial activity.', desc: 'Searchable, filterable logbook to verify past payments and track month-over-month habits.' }
  ]

  const categories = [
    { name: 'Food & Dining', amount: '₹3,450' },
    { name: 'Books & Academics', amount: '₹1,200' },
    { name: 'Transit & Auto', amount: '₹840' },
    { name: 'Hostel & Utilities', amount: '₹4,500' },
  ]

  return (
    <section id="solution" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#080D1A' }}>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-radial-blue opacity-50 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Solution List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#60A5FA' }}
            >
              The WalletWise Way
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
              A <span className="text-text-accent">smarter way</span> to manage student finances.
            </h2>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              WalletWise replaces messy notebooks and bloated accounting software with a lean, purpose-built companion that fits into your pocket.
            </p>

            <div className="pt-2 space-y-2">
              {solutions.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl transition-colors hover:bg-dark-card">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(37, 99, 235, 0.12)' }}
                    >
                      <Icon className="w-4 h-4 text-text-accent stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-primary">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Product Interface Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl p-6 sm:p-8 shadow-elevated relative"
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(14px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Fast Transaction Entry</span>
                  <h3 className="text-lg font-bold text-text-primary">New Expense Log</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: 'rgba(37, 99, 235, 0.12)', color: '#60A5FA' }}
                >
                  Demo Preview
                </span>
              </div>

              {/* Amount Display */}
              <div className="mt-6 rounded-2xl p-4 shadow-subtle flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Expense Amount</p>
                  <p className="text-2xl font-bold text-text-primary tracking-tight">₹ 140.00</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-text-secondary"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  INR (₹)
                </span>
              </div>

              {/* Category Selector */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Select Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat.name
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setActiveCategory(cat.name)}
                        className="px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between"
                        style={{
                          background: isSelected ? '#2563EB' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isSelected ? '#2563EB' : 'rgba(255,255,255,0.08)'}`,
                          color: isSelected ? '#FFFFFF' : '#A6B2C5',
                        }}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[11px]" style={{ opacity: isSelected ? 0.7 : 0.5 }}>{cat.amount}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Note */}
              <div className="mt-4 rounded-xl px-3.5 py-2.5 text-xs flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-text-muted">Note: <span className="text-text-secondary font-medium">Semester engineering printouts</span></span>
                <span className="text-[11px] text-text-accent font-semibold">Optional</span>
              </div>

              {/* Budget Impact */}
              <div className="mt-5 p-3.5 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.15)' }}
              >
                <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-xs text-text-secondary leading-normal">
                  <span className="font-bold text-text-accent">Budget Impact:</span> Deducted from monthly study budget. <strong className="text-text-primary">₹1,860</strong> remaining.
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={onGetStarted}
                className="mt-5 w-full py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-glow-blue"
              >
                <span>Try In Live App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
