import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, PiggyBank, Target, Calendar, Tag, FileText } from 'lucide-react'
import Button from '../ui/Button'
import { useTransactions } from '../../context/TransactionContext'

const CATEGORIES = [
  'Emergency Fund',
  'Gadgets & Tech',
  'Tuition & Books',
  'Travel & Trips',
  'Semester Savings',
  'Personal Investment',
  'Other'
]

const COLORS = [
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#8B5CF6'  // Purple
]

export default function AddSavingsGoalModal({ isOpen, onClose, initialData = null }) {
  const { addSavingsGoal, updateSavingsGoal, formatCurrency } = useTransactions()

  const [title, setTitle] = useState(initialData?.title || '')
  const [targetAmount, setTargetAmount] = useState(initialData?.targetAmount || '')
  const [currentAmount, setCurrentAmount] = useState(initialData?.currentAmount || '')
  const [targetDate, setTargetDate] = useState(
    initialData?.targetDate ? initialData.targetDate.split('T')[0] : ''
  )
  const [category, setCategory] = useState(initialData?.category || 'Gadgets & Tech')
  const [color, setColor] = useState(initialData?.color || '#10B981')
  const [description, setDescription] = useState(initialData?.description || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Please provide a goal title.')
      return
    }

    const target = parseFloat(targetAmount)
    if (isNaN(target) || target <= 0) {
      setError('Target amount must be greater than zero.')
      return
    }

    setSubmitting(true)

    const payload = {
      title: title.trim(),
      targetAmount: target,
      currentAmount: parseFloat(currentAmount) || 0,
      targetDate: targetDate ? new Date(targetDate).toISOString() : null,
      category,
      color,
      description: description.trim()
    }

    let res
    if (initialData?._id) {
      res = await updateSavingsGoal(initialData._id, payload)
    } else {
      res = await addSavingsGoal(payload)
    }

    setSubmitting(false)

    if (res?.success) {
      onClose()
    } else {
      setError(res?.message || 'Failed to save savings goal.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18 }}
        className="relative w-full max-w-lg bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main">
                {initialData ? 'Edit Savings Goal' : 'Create Savings Goal'}
              </h3>
              <p className="text-xs text-text-muted">
                Target milestones for tech, books, trips, or reserves.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-dark-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Goal Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Goal Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New Coding Laptop, Semester Trip, Emergency Fund"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
          </div>

          {/* Amounts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Target Amount <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="1"
                  step="any"
                  placeholder="50000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-sm font-mono tabular-nums text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Initial Saved Amount
              </label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-sm font-mono tabular-nums text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
            </div>
          </div>

          {/* Category & Target Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-sm text-text-main focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Target Completion Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-dark-secondary border border-dark-border text-sm text-text-main focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              />
            </div>
          </div>

          {/* Color Tag Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'scale-110 ring-2 ring-emerald-400' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Notes / Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Description <span className="text-text-muted font-normal">(Optional)</span>
            </label>
            <textarea
              rows="2"
              placeholder="Milestone notes or purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-dark-secondary border border-dark-border text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-dark-border">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : initialData ? 'Update Goal' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
