import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowDownRight, ArrowUpRight, Calendar, CreditCard, FileText } from 'lucide-react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '../../constants/categories.js'
import CategoryIcon from '../ui/CategoryIcon'
import Button from '../ui/Button'
import { useTransactions } from '../../context/TransactionContext'

export default function AddTransactionModal({ isOpen, onClose, initialData = null, defaultType = 'expense' }) {
  const { addTransaction, editTransaction } = useTransactions()

  const [type, setType] = useState(defaultType)
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || 'expense')
      setAmount(initialData.amount ? initialData.amount.toString() : '')
      setTitle(initialData.title || '')
      setCategory(initialData.category || (initialData.type === 'income' ? 'Monthly Allowance' : 'Food'))
      setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])
      setPaymentMethod(initialData.paymentMethod || 'UPI')
      setDescription(initialData.description || '')
    } else {
      setType(defaultType)
      setAmount('')
      setTitle('')
      setCategory(defaultType === 'income' ? 'Monthly Allowance' : 'Food')
      setDate(new Date().toISOString().split('T')[0])
      setPaymentMethod('UPI')
      setDescription('')
    }
    setError('')
  }, [initialData, defaultType, isOpen])

  const handleTypeChange = (newType) => {
    setType(newType)
    setCategory(newType === 'income' ? 'Monthly Allowance' : 'Food')
  }

  const handleQuickAddAmount = (addVal) => {
    const current = parseFloat(amount) || 0
    setAmount((current + addVal).toString())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const numAmount = parseFloat(amount)
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than zero.')
      return
    }
    if (!title.trim()) {
      setError('Please provide a title for this transaction.')
      return
    }

    setLoading(true)
    const payload = {
      type,
      amount: numAmount,
      title: title.trim(),
      category,
      date,
      paymentMethod,
      description: description.trim(),
    }

    let res
    if (initialData && initialData._id) {
      res = await editTransaction(initialData._id, payload)
    } else {
      res = await addTransaction(payload)
    }

    setLoading(false)
    if (res.success) {
      onClose()
    } else {
      setError(res.message || 'Failed to save transaction')
    }
  }

  if (!isOpen) return null

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

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

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-dark-border">
            <h3 className="text-xl font-bold text-text-main">
              {initialData ? 'Edit Transaction' : 'Record Transaction'}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-dark-card-elevated transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* Type Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-dark-secondary border border-dark-border">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  type === 'expense'
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                <ArrowDownRight className="w-4 h-4 text-rose-400" />
                <span>Expense</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  type === 'income'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span>Income</span>
              </button>
            </div>

            {/* Prominent Amount Input */}
            <div className="bg-dark-secondary p-4 rounded-2xl border border-dark-border">
              <label className="block text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                Amount (INR ₹)
              </label>
              <div className="relative flex items-center">
                <span className="text-2xl font-bold text-text-muted mr-2">₹</span>
                <input
                  type="number"
                  step="any"
                  autoFocus
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent text-3xl font-extrabold text-text-main placeholder:text-text-subtle focus:outline-none"
                />
              </div>

              {/* Quick Stepper Chips */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dark-border/60 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold text-text-subtle mr-1">Quick:</span>
                {[50, 100, 200, 500, 1000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleQuickAddAmount(val)}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-dark-card border border-dark-border hover:border-brand-blue/40 text-text-secondary hover:text-text-main transition-colors shrink-0"
                  >
                    +₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Title / Spent On
              </label>
              <input
                type="text"
                required
                placeholder={type === 'expense' ? 'e.g. Canteen Lunch, Metro Pass, Books' : 'e.g. Monthly Allowance, Internship'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-subtle focus:outline-none focus:border-brand-blue text-sm transition-colors"
              />
            </div>

            {/* Category Grid */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Category
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1">
                {categories.map((cat) => {
                  const isSelected = category === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-brand-blue/15 border-brand-blue text-text-main shadow-sm'
                          : 'bg-dark-secondary border-dark-border text-text-secondary hover:border-dark-border-hover'
                      }`}
                    >
                      <CategoryIcon category={cat} size="sm" className="mb-1" />
                      <span className="text-[11px] font-medium truncate w-full">{cat}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Date & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Date
                </label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors"
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m} className="bg-dark-card text-text-main">
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description (Optional) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Note / Description <span className="text-text-subtle font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Add any extra notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-dark-secondary border border-dark-border text-text-main placeholder:text-text-subtle focus:outline-none focus:border-brand-blue text-xs transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={loading} className="px-6">
                {initialData ? 'Update Transaction' : `Save ${type === 'income' ? 'Income' : 'Expense'}`}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
