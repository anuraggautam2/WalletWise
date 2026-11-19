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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <button
        onClick={() => onNavigate('login')}
        className="absolute top-6 left-6 text-xs text-text-muted hover:text-text-main flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Login</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-7 sm:p-9 shadow-2xl relative z-10"
      >
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue-light border border-brand-blue/30 flex items-center justify-center mx-auto mb-3">
            <Key className="w-6 h-6" />
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
                <Mail className="w-4 h-4 absolute left-3.5 text-text-muted" />
                <input
                  type="email"
                  required
                  placeholder="alex@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-subtle focus:outline-none focus:border-brand-blue text-sm transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium flex items-center gap-2">
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
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{message}</p>

            {demoToken && (
              <div className="p-3.5 rounded-xl bg-dark-secondary border border-dark-border text-left">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Demo Reset Token:</p>
                <code className="text-xs font-mono text-brand-blue-light break-all block mt-1">{demoToken}</code>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onTokenGenerated(demoToken)}
                    className="w-full"
                  >
                    <span>Proceed to Set New Password</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-text-muted pt-4 border-t border-dark-border/60">
          Remember your password?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-brand-blue-light font-bold hover:underline"
          >
            Back to sign in
          </button>
        </div>
      </motion.div>
    </div>
  )
}
