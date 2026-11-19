import React, { useState } from 'react'
import { X, CheckCircle2, Wallet, ArrowRight, ShieldCheck } from 'lucide-react'

export default function GetStartedModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setEmail('')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-elevated border border-surface-border p-6 sm:p-8 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main rounded-xl hover:bg-surface-light transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center mb-5 border border-brand-blue-subtle/40">
              <Wallet className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
              Get Started with WalletWise
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Join thousands of students building smarter financial habits. Enter your email for priority student access.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="student-email" className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Student or College Email
                </label>
                <input
                  type="email"
                  id="student-email"
                  required
                  placeholder="alex@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-surface-border text-text-main placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-navy hover:bg-navy-800 text-white font-semibold text-sm transition-all duration-150 shadow-subtle hover:shadow-card"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-surface-border/70 flex items-center justify-center gap-2 text-xs text-text-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Free for students &bull; No bank login required</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy">
              You're on the list!
            </h3>
            <p className="mt-2 text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
              We've reserved your spot with <span className="font-semibold text-text-main">{email}</span>. We'll send your invite as rollout begins.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-xl bg-surface-light hover:bg-surface-subtle text-text-main font-semibold text-sm transition-colors border border-surface-border"
            >
              Back to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
