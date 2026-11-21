import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowRight, Lock, Mail, User, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function RegisterPage({ onNavigate, onRegisterSuccess }) {
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)
    const res = await register(name, email, password, confirmPassword)
    setLoading(false)

    if (res.success) {
      if (onRegisterSuccess) onRegisterSuccess()
    } else {
      setError(res.message || 'Registration failed. Please check your details.')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-text-main flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Subtle background geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Top back button */}
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 text-xs text-text-muted hover:text-text-main flex items-center gap-1.5 transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-xl p-7 sm:p-9 shadow-2xl relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-7">
          <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-text-main tracking-tight">Create Account</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Student expense tracking with real-time budget intelligence
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Nikhil Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Student / College Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
              <input
                type="email"
                required
                placeholder="nikhil@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Password <span className="text-text-muted font-normal">(min 6 chars)</span>
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-text-muted hover:text-text-main transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-text-muted pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Switch to Login */}
        <div className="mt-5 pt-4 border-t border-dark-border/60 text-center text-xs text-text-muted">
          Already have an account?{' '}
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
