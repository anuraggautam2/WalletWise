import React from 'react'
import { PlusCircle, LineChart, Target } from 'lucide-react'

export default function HowItWorks({ onGetStarted }) {
  const steps = [
    {
      number: '01',
      title: 'Add your expenses.',
      description: 'Log daily purchases with minimal taps right after you buy. Assign student categories in one click.',
      icon: PlusCircle,
      tag: 'Fast Entry',
      cue: '+ ₹120 Campus Snack'
    },
    {
      number: '02',
      title: 'Understand your spending.',
      description: 'See visual summaries that translate raw numbers into meaningful trends, weekly rhythms, and category allocations.',
      icon: LineChart,
      tag: 'Visual Clarity',
      cue: 'Food: 38% • Books: 24%'
    },
    {
      number: '03',
      title: 'Stay in control of your budget.',
      description: 'Use active pacing gauges to know exactly how much you can spend per day without running out before month-end.',
      icon: Target,
      tag: 'Pacing Shield',
      cue: '₹370/day safe spend'
    }
  ]

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#080D1A' }}>
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-radial-violet opacity-40 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.15)', color: '#A78BFA' }}
          >
            Simple Routine
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
            Managing money doesn't have to be <span className="text-brand-violet">complicated</span>.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            A frictionless workflow built around the reality of busy campus days, lectures, and semester schedules.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className="rounded-3xl p-7 shadow-subtle flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
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
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-brand-blue tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Icon className="w-5 h-5 text-text-secondary stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-[11px] font-semibold text-text-muted">{step.tag}</span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md text-text-accent"
                    style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.15)' }}
                  >
                    {step.cue}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
