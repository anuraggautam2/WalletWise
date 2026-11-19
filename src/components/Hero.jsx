import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, CheckCircle2, TrendingUp, Laptop, Coffee, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function Hero({ onGetStarted, onNavigate }) {
  const { isAuthenticated } = useAuth()

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
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-brand-blue/10 rounded-full blur-[140px]" />
        <div className="absolute top-24 right-10 w-[500px] h-[400px] bg-brand-violet/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-blue-light" />
              <span>Track Smart &bull; Spend Better</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
            >
              <span className="text-text-main">Your Student Life.</span><br />
              <span className="text-brand-blue-light">Your Money.</span><br />
              <span className="text-text-main">Your Rules.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
            >
              From daily coffee runs to monthly college expenses, WalletWise helps you understand your spending, stay within budget and build better financial habits.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('dashboard')}
                  className="shadow-fintech-glow-blue"
                >
                  <span>Open Your Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onNavigate('register')}
                  className="shadow-fintech-glow-blue"
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
                <span>Discover WalletWise</span>
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
                <span>Campus-friendly categories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Private & student-first</span>
              </div>
            </div>

          </div>

          {/* Right Column: Combined Photo & Fintech Dashboard Card Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Primary Photograph Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-dark-border bg-dark-secondary">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Student working with laptop and notebook in a bright university environment"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/40 to-transparent pointer-events-none" />

                {/* Caption tag */}
                <div className="absolute bottom-4 left-4 sm:left-6 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 bg-dark-card/90 backdrop-blur-md border border-dark-border text-text-secondary">
                  <Laptop className="w-3.5 h-3.5 text-brand-blue-light" />
                  <span>College life made financially manageable</span>
                </div>
              </div>

              {/* Floating Fintech Micro Card: Live Allowance Status */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-6 lg:-left-8 rounded-2xl p-5 shadow-2xl w-full sm:w-[320px] bg-dark-card/95 backdrop-blur-md border border-dark-border"
              >
                <div className="flex items-center justify-between pb-3 border-b border-dark-border/60">
                  <div>
                    <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                      Monthly Allowance
                    </span>
                    <p className="text-xl font-bold text-text-main">₹15,000</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    On Track
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Spent: <strong className="text-text-main font-semibold">₹6,240</strong></span>
                    <span>Remaining: <strong className="text-emerald-400 font-semibold">₹8,760</strong></span>
                  </div>
                  <div className="w-full bg-dark-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-blue h-2 rounded-full" style={{ width: '41.6%' }} />
                  </div>
                </div>

                {/* Sample recent student log */}
                <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-brand-blue-light flex items-center justify-center">
                      <Coffee className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-main">Campus Cafe</p>
                      <p className="text-[10px] text-text-muted">Food & Snacks</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-main">-₹85</span>
                </div>
              </motion.div>

              {/* Floating Quick Entry Badge (Top Right) */}
              <motion.div
                whileHover={{ y: -2 }}
                className="hidden sm:flex absolute -top-4 -right-4 rounded-xl px-3.5 py-2.5 shadow-xl items-center gap-2.5 bg-dark-card/95 backdrop-blur-md border border-dark-border"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-text-main">5s Quick Entry</p>
                  <p className="text-[10px] text-text-muted">No manual spreadsheets</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
