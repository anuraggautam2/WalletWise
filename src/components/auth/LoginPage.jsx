import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowRight, Lock, Mail, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await login(email, password)
    setLoading(false)

    if (res.success) {
      if (onLoginSuccess) onLoginSuccess()
    } else {
      setError(res.message || 'Invalid email or password.')
    }
  }

  const handleFillDemo = () => {
    setEmail('nikhil@test.edu')
    setPassword('password123')
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[350px] bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top back button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 text-xs text-text-muted hover:text-text-main flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-7 sm:p-9 shadow-2xl relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white shadow-fintech-glow-blue mx-auto mb-4">
            <Wallet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-main tracking-tight">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Log in to your WalletWise student expense tracker
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Email Address
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-xs text-brand-blue-light hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-text-muted" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full shadow-md"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-5 pt-4 border-t border-dark-border/60 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-brand-blue-light hover:text-white flex items-center justify-center gap-1.5 mx-auto py-1 px-3 rounded-lg hover:bg-dark-secondary transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-blue-light" />
            <span>Use Demo Student Account</span>
          </button>
        </div>

        {/* Switch to Register */}
        <div className="mt-4 text-center text-xs text-text-muted">
          Don't have an account yet?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-brand-blue-light font-bold hover:underline"
          >
            Sign up for free
          </button>
        </div>
      </motion.div>
    </div>
  )
}
