import React from 'react'
import { Receipt, Sliders, BarChart3, PiggyBank, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Card from './ui/Card'

export default function Features() {
  const pillars = [
    {
      icon: Receipt,
      tag: 'Pillar 01',
      title: 'Fast Ledger & Instant Tagging',
      desc: 'Log expenses in seconds with campus-specific categories—from canteen meals to course textbooks and transit fares.',
      preview: [
        { label: 'Campus Canteen', tag: 'Food', amount: '-₹95', color: 'text-text-main' },
        { label: 'Lab Manual Photocopies', tag: 'Academics', amount: '-₹150', color: 'text-text-main' },
      ]
    },
    {
      icon: Sliders,
      tag: 'Pillar 02',
      title: 'Real-Time Allowance Pacing',
      desc: 'Never run out of money mid-month. WalletWise computes your remaining safe daily burn rate based on current date and budget limit.',
      previewMeter: {
        label: 'Monthly Food Allowance',
        spent: '₹3,100',
        total: '₹4,500',
        percent: 68,
      }
    },
    {
      icon: PiggyBank,
      tag: 'Pillar 03',
      title: 'Targeted Savings Milestones',
      desc: 'Allocate money towards semester laptops, certification courses, or emergency reserves with automated progress tracking.',
      previewGoal: {
        title: 'Semester Laptop Upgrade',
        saved: '₹18,500',
        target: '₹25,000',
        percent: 74,
      }
    },
    {
      icon: BarChart3,
      tag: 'Pillar 04',
      title: 'Institutional Ratio Analytics',
      desc: 'Gain instant insight into savings velocity, inflow versus outflow ratios, and peak spending days with clean visual distributions.',
      previewStats: [
        { label: 'Savings Rate', val: '24%' },
        { label: 'Top Spend Area', val: 'Dining (42%)' },
      ]
    }
  ]

  return (
    <section id="features" className="py-20 sm:py-28 bg-dark relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            Engineered For Students
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
            Financial instruments built for <span className="text-emerald-400">real campus life</span>.
          </h2>

          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Every feature is purpose-built to eliminate student budgeting friction without tedious bookkeeping complexity.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <Card key={idx} className="p-7 sm:p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-text-muted">{p.tag}</span>
                  </div>

                  <h3 className="text-xl font-bold text-text-main tracking-tight mb-2">{p.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">{p.desc}</p>
                </div>

                {/* Interactive Visual Block */}
                <div className="rounded-lg p-4 bg-dark-secondary/60 border border-dark-border/60">
                  {p.preview && (
                    <div className="space-y-2">
                      {p.preview.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-text-main">{item.label}</span>
                            <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-dark-card border border-dark-border text-text-muted">
                              {item.tag}
                            </span>
                          </div>
                          <span className="font-bold font-mono tabular-nums text-text-main">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {p.previewMeter && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono tabular-nums">
                        <span className="text-text-muted">{p.previewMeter.label}</span>
                        <span className="font-bold text-emerald-400">{p.previewMeter.percent}%</span>
                      </div>
                      <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${p.previewMeter.percent}%` }} />
                      </div>
                      <div className="flex justify-between text-[11px] text-text-muted font-mono">
                        <span>Spent: {p.previewMeter.spent}</span>
                        <span>Limit: {p.previewMeter.total}</span>
                      </div>
                    </div>
                  )}

                  {p.previewGoal && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-text-main">{p.previewGoal.title}</span>
                        <span className="font-mono text-emerald-400 font-bold">{p.previewGoal.percent}%</span>
                      </div>
                      <div className="w-full bg-dark-card h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${p.previewGoal.percent}%` }} />
                      </div>
                      <div className="flex justify-between text-[11px] text-text-muted font-mono">
                        <span>Saved: {p.previewGoal.saved}</span>
                        <span>Target: {p.previewGoal.target}</span>
                      </div>
                    </div>
                  )}

                  {p.previewStats && (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {p.previewStats.map((s, i) => (
                        <div key={i} className="p-2.5 rounded bg-dark-card border border-dark-border">
                          <p className="text-[10px] text-text-muted uppercase tracking-wider">{s.label}</p>
                          <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{s.val}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}
