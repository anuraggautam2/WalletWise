import React from 'react'
import { PlusCircle, LineChart, Target, ArrowRight } from 'lucide-react'
import Card from './ui/Card'

export default function HowItWorks({ onGetStarted }) {
  const steps = [
    {
      number: '01',
      title: 'Log Purchases in Seconds',
      description: 'Record daily expenses with instant quick-chips right from your phone or laptop. Categorize with one tap.',
      tag: 'Fast Entry',
      cue: '+ ₹120 Campus Snack'
    },
    {
      number: '02',
      title: 'Automated Pacing Engine',
      description: 'WalletWise immediately recalculates your safe daily allowance based on remaining days in the month.',
      tag: 'Pacing Guard',
      cue: '₹370 / day safe burn rate'
    },
    {
      number: '03',
      title: 'Reach Savings Milestones',
      description: 'Keep aside money for semester tuition, gadgets, or emergency reserves with automated visual progress bars.',
      tag: 'Discipline',
      cue: '75% of Laptop Fund Saved'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-dark relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Frictionless Workflow
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
            Financial clarity in <span className="text-emerald-400">three simple steps</span>.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            A lean daily routine designed around busy lecture timetables, exams, and student life.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              className="p-7 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-emerald-400 tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-dark-secondary border border-dark-border text-text-muted">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-main tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="p-3 rounded-md bg-dark-secondary/60 border border-dark-border/60 text-xs font-mono text-emerald-400">
                {step.cue}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
