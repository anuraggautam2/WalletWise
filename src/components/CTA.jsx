import React from 'react'
import { ArrowRight, Wallet, ShieldCheck, Zap } from 'lucide-react'

export default function CTA({ onGetStarted }) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#080D1A' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial-center opacity-80 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* CTA Container */}
        <div className="relative rounded-3xl px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden shadow-elevated"
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(167, 139, 250, 0.06) 50%, rgba(37, 99, 235, 0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(37, 99, 235, 0.25)', color: '#60A5FA' }}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Smart Student Expense Tracker</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
              Make every rupee <span className="text-text-accent">count</span>.
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-text-secondary font-normal leading-relaxed">
              Start building better money habits with WalletWise.
            </p>

            {/* Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-base transition-all duration-200 shadow-glow-blue hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-text-accent" />
                <span>Instant onboarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free for students</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
