import React from 'react'
import { ArrowRight, ChevronDown, CheckCircle2, TrendingUp, Laptop, Coffee } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  const handleDiscover = (e) => {
    e.preventDefault()
    const target = document.querySelector('#problem')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-radial-blue opacity-100" />
        <div className="absolute top-20 right-0 w-[500px] h-[400px] bg-radial-violet opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Pill Tag */}
            <div className="animate-fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                color: '#60A5FA',
              }}
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-blue animate-pulse" />
              <span>Smart Expense Tracking for Students</span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-text-primary">Your Student Life.</span><br />
              <span className="text-text-accent">Your Money.</span><br />
              <span className="text-text-primary">Your Rules.</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
              From daily coffee runs to monthly college expenses, WalletWise helps you understand your spending, stay within budget and build better financial habits.
            </p>

            {/* Action Buttons */}
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-base transition-all duration-200 shadow-glow-blue hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#problem"
                onClick={handleDiscover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base text-text-secondary hover:text-text-primary transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <span>Discover WalletWise</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </a>
            </div>

            {/* Value Micro-list */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Zero complex spreadsheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Campus-friendly categories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Private & student-first</span>
              </div>
            </div>

          </div>

          {/* Right Column: Photo & Fintech Interface Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Primary Photograph */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-elevated"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Student working with laptop and notebook in a bright university environment"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                  loading="eager"
                />
                {/* Dark gradient overlay to blend with background */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/30 to-transparent pointer-events-none" />

                {/* Micro photo caption */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2"
                  style={{
                    background: 'rgba(13, 20, 36, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#A6B2C5',
                  }}
                >
                  <Laptop className="w-3.5 h-3.5 text-brand-blue" />
                  <span>College life made financially manageable</span>
                </div>
              </div>

              {/* Floating Budget Card (Left overlap) */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-6 lg:-left-8 rounded-2xl p-5 shadow-elevated w-full sm:w-[320px] transition-transform hover:-translate-y-1 duration-300"
                style={{
                  background: 'rgba(13, 20, 36, 0.88)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Monthly Allowance</span>
                    <p className="text-xl font-bold text-text-primary">₹15,000</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-md text-[11px] font-bold"
                    style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      color: '#34D399',
                    }}
                  >
                    On Track
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Spent: <strong className="text-text-primary font-medium">₹6,240</strong></span>
                    <span>Remaining: <strong className="text-emerald-400 font-semibold">₹8,760</strong></span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="bg-brand-blue h-2 rounded-full" style={{ width: '41.6%' }} />
                  </div>
                </div>

                {/* Sample recent log */}
                <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37, 99, 235, 0.15)' }}>
                      <Coffee className="w-3.5 h-3.5 text-text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">Campus Cafe</p>
                      <p className="text-[10px] text-text-muted">Food & Snacks</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-primary">-₹85</span>
                </div>
              </div>

              {/* Floating Quick Entry Badge (Top Right) */}
              <div className="hidden sm:flex absolute -top-4 -right-4 rounded-xl px-3.5 py-2.5 shadow-card items-center gap-2.5"
                style={{
                  background: 'rgba(13, 20, 36, 0.88)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-text-primary">5s Quick Entry</p>
                  <p className="text-[10px] text-text-muted">No manual spreadsheets</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
