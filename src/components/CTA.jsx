import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Wallet, ShieldCheck, Zap } from 'lucide-react'
import Button from './ui/Button'
import { useAuth } from '../context/AuthContext'

export default function CTA({ onGetStarted, onNavigate }) {
  const { isAuthenticated } = useAuth()

  const handleAction = () => {
    if (onNavigate) {
      onNavigate(isAuthenticated ? 'dashboard' : 'register')
    } else if (onGetStarted) {
      onGetStarted()
    }
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* CTA Container */}
        <div
          className="relative rounded-3xl px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden shadow-2xl border border-dark-border"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(59, 130, 246, 0.1) 100%)',
          }}
        >
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/15 border border-brand-blue/30 text-brand-blue-light">
              <Wallet className="w-3.5 h-3.5 text-brand-blue-light" />
              <span>Smart Student Expense Tracker</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
              Make every rupee <span className="text-brand-blue-light">count</span>.
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-text-secondary font-normal leading-relaxed">
              Start building better money habits with WalletWise.
            </p>

            {/* Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAction}
                className="w-full sm:w-auto px-8 py-4 shadow-fintech-glow-blue"
              >
                <span>{isAuthenticated ? 'Open Dashboard' : 'Get Started Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-brand-blue-light" />
                <span>Instant student onboarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free &bull; Private & Secure</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
