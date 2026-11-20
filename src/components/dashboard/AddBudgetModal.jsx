import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Target, Sliders } from 'lucide-react'
import { EXPENSE_CATEGORIES } from '../../constants/categories.js'
import Button from '../ui/Button'
import { useTransactions } from '../../context/TransactionContext'

export default function AddBudgetModal({ isOpen, onClose }) {
  const { setBudget } = useTransactions()
  const now = new Date()

  const [budgetType, setBudgetType] = useState('overall') // 'overall' | 'category'
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0])
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const numAmount = parseFloat(amount)
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Please provide a valid budget limit greater than zero.')
      return
    }

    setLoading(true)
    const res = await setBudget({
      budgetType,
      category: budgetType === 'overall' ? 'Overall' : category,
      amount: numAmount,
      month,
      year,
    })
    setLoading(false)

    if (res.success) {
      setAmount('')
      onClose()
    } else {
      setError(res.message || 'Failed to set budget')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#060A14]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-dark-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/15 flex items-center justify-center text-brand-blue-light">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-text-main">Set Budget Target</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-dark-card-elevated transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Scope: Overall vs Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Budget Scope
              </label>
              <div className="grid grid-cols-2 p-1 rounded-xl bg-dark-secondary border border-dark-border">
                <button
                  type="button"
                  onClick={() => setBudgetType('overall')}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    budgetType === 'overall'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  Overall Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetType('category')}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    budgetType === 'category'
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  By Category
                </button>
              </div>
            </div>

            {/* Category selection if 'category' */}
            {budgetType === 'category' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Expense Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-dark-card text-text-main">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Target Budget Limit (INR ₹)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-text-muted">₹</span>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-lg font-bold focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            {/* Month & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors"
                >
                  {months.map((m, idx) => (
                    <option key={m} value={idx + 1} className="bg-dark-card text-text-main">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={loading} className="px-6">
                Save Target
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
