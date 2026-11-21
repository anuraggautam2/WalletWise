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
    <section className="py-20 sm:py-28 bg-dark relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CTA Container */}
        <div className="relative rounded-xl px-6 py-16 sm:px-12 sm:py-20 text-center overflow-hidden shadow-2xl border border-dark-border bg-dark-card">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modern Student Financial Ledger</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
              Take complete control of your <span className="text-emerald-400">money</span>.
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-secondary font-normal leading-relaxed">
              Start building lifelong money discipline today with WalletWise.
            </p>

            {/* Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAction}
              >
                <span>{isAuthenticated ? 'Open Your Dashboard' : 'Get Started Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Ads or Upsells</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Instant Cloud Sync</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
