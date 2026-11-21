import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, PlusCircle, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'
import { useTransactions } from '../../context/TransactionContext'

export default function DepositModal({ isOpen, onClose, goal = null }) {
  const { addSavingsDeposit, formatCurrency } = useTransactions()
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !goal) return null

  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const val = parseFloat(amount)
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid deposit amount greater than zero.')
      return
    }

    setSubmitting(true)
    const res = await addSavingsDeposit(goal._id, val)
    setSubmitting(false)

    if (res?.success) {
      onClose()
    } else {
      setError(res?.message || 'Failed to add deposit.')
    }
  }

  const quickAmounts = [100, 500, 1000, 2000, Math.min(5000, remaining)].filter((a) => a > 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#060A14]/80 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-[#0E1420] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Add Savings Contribution</h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">{goal.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Goal Snapshot */}
          <div className="p-3.5 rounded-xl bg-[#141C2E] border border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Current Progress</p>
              <p className="text-sm font-semibold text-slate-100 mt-0.5">
                {formatCurrency(goal.currentAmount)} <span className="text-slate-500 font-normal">/ {formatCurrency(goal.targetAmount)}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Remaining</p>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5 font-mono">
                {formatCurrency(remaining)}
              </p>
            </div>
          </div>

          {/* Deposit Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Deposit Amount
            </label>
            <input
              type="number"
              required
              min="1"
              step="any"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141C2E] border border-white/[0.08] text-base font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          {/* Quick Selection Chips */}
          <div>
            <p className="text-[11px] text-slate-400 mb-2">Quick Add</p>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setAmount(q.toString())}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-slate-300 transition-colors"
                >
                  +{formatCurrency(q)}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/[0.06]">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={submitting}>
              {submitting ? 'Depositing...' : 'Confirm Deposit'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
