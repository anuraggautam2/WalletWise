import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowRight, Mail, AlertCircle, ArrowLeft, CheckCircle2, Key } from 'lucide-react'
import { api } from '../../services/api'
import Button from '../ui/Button'

export default function ForgotPasswordPage({ onNavigate, onTokenGenerated }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [demoToken, setDemoToken] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await api.forgotPassword(email)
      setLoading(false)
      if (res.success) {
        setMessage(res.message)
        if (res.demoResetToken) {
          setDemoToken(res.demoResetToken)
        }
      }
    } catch (err) {
      setLoading(false)
      setError(err.message || 'Failed to request password reset.')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <button
        onClick={() => onNavigate('login')}
        className="absolute top-6 left-6 text-xs text-text-muted hover:text-text-main flex items-center gap-1.5 transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Login</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-xl p-7 sm:p-9 shadow-2xl relative z-10"
      >
        <div className="text-center mb-7">
          <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-main tracking-tight">Reset Password</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {!message ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Registered Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-main">Check Your Inbox</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{message}</p>

            {demoToken && (
              <div className="mt-4 p-3 rounded-lg bg-dark-secondary border border-emerald-500/30 text-left">
                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Demo Quick Access</p>
                <p className="text-xs text-text-secondary mt-1">In local test mode, a reset token has been generated:</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <code className="text-xs bg-dark-card px-2 py-1 rounded border border-dark-border text-emerald-400 font-mono truncate max-w-[200px]">
                    {demoToken}
                  </code>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      if (onTokenGenerated) {
                        onTokenGenerated(demoToken)
                      }
                    }}
                  >
                    Proceed &rarr;
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-dark-border/60 text-center text-xs text-text-muted">
          Remembered your password?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-emerald-400 font-bold hover:underline"
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  )
}
