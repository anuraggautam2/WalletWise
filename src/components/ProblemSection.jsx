import React from 'react'
import { AlertCircle, Receipt, CalendarX, HelpCircle, Coffee, BookOpen, Train } from 'lucide-react'

export default function ProblemSection() {
  const problems = [
    {
      icon: Receipt,
      tag: 'Micro-Expenses',
      title: 'Small daily expenses add up.',
      description: 'Chai, canteen snacks, photocopies, and quick autos feel insignificant in the moment, but quietly swallow up to 40% of your monthly funds.',
    },
    {
      icon: CalendarX,
      tag: 'Friction',
      title: 'Tracking spending manually is difficult.',
      description: 'Notes apps are clunky, paper receipts end up crushed in bags, and complex Excel spreadsheets feel like extra homework after classes.',
    },
    {
      icon: AlertCircle,
      tag: 'Pacing Gap',
      title: 'Monthly budgets are easily exceeded.',
      description: 'Without a clear daily spend rate, pocket money or allowances intended to last a full month frequently run dry before the 20th.',
    },
    {
      icon: HelpCircle,
      tag: 'Blind Spots',
      title: 'Students often lose track of their spending habits.',
      description: 'You check your bank account or wallet at month-end and wonder where it all went, with zero visibility into patterns or recurring leaks.',
    }
  ]

  return (
    <section id="problem" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#0D1424' }}>
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-radial-violet opacity-60 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              border: '1px solid rgba(167, 139, 250, 0.15)',
              color: '#A78BFA',
            }}
          >
            The Campus Reality
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            Where does all your <span className="text-brand-violet">money</span> go?
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Students don't overspend on extravagant luxuries. Pocket money quietly slips away through untracked day-to-day routines.
          </p>
        </div>

        {/* Asymmetric 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Untracked Day Visual */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-7 shadow-card"
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Anatomy of an Untracked Day</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171' }}
              >
                Untracked Leak
              </span>
            </div>

            <div className="mt-5 space-y-3.5">
              {[
                { icon: Coffee, name: 'Morning Chai & Samosa', place: 'Campus stall • 9:30 AM', amount: '-₹45', color: 'text-amber-400', bg: 'rgba(245, 158, 11, 0.1)' },
                { icon: BookOpen, name: 'Lecture Notes & Prints', place: 'Library center • 1:15 PM', amount: '-₹120', color: 'text-text-accent', bg: 'rgba(37, 99, 235, 0.1)' },
                { icon: Train, name: 'Auto Share to Hostel', place: 'Transit • 5:40 PM', amount: '-₹60', color: 'text-brand-violet', bg: 'rgba(167, 139, 250, 0.1)' },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.bg }}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">{item.name}</p>
                        <p className="text-[11px] text-text-muted">{item.place}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#F87171' }}>{item.amount}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 pt-4 flex items-center justify-between text-xs"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-text-muted">Day's unrecorded micro-spend:</span>
              <span className="font-bold text-text-primary text-sm">₹225 / day</span>
            </div>
            <p className="mt-2 text-[11px] text-text-muted leading-normal">
              Over 30 days, small daily ₹225 leaks equal <strong className="text-text-accent">₹6,750</strong> unaccounted money.
            </p>
          </div>

          {/* Right Column: 4 Problem Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {problems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(14px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.065)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <Icon className="w-4 h-4 text-text-secondary stroke-[2]" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded"
                        style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#60A5FA' }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-text-primary tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 flex items-center gap-1.5 text-[11px] font-semibold text-text-subtle"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span>Problem 0{idx + 1}</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
