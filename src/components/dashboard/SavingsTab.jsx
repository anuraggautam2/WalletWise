import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PiggyBank,
  Plus,
  Target,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  MoreVertical,
  Trash2,
  Edit2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import AddSavingsGoalModal from './AddSavingsGoalModal'
import DepositModal from './DepositModal'
import ConfirmDialog from './ConfirmDialog'
import { useTransactions } from '../../context/TransactionContext'

export default function SavingsTab() {
  const { savingsGoals, savingsSummary, deleteSavingsGoal, formatCurrency, loading } = useTransactions()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [depositGoal, setDepositGoal] = useState(null)
  const [deleteConfirmGoal, setDeleteConfirmGoal] = useState(null)

  const handleEdit = (goal) => {
    setEditingGoal(goal)
    setAddModalOpen(true)
  }

  const handleCreate = () => {
    setEditingGoal(null)
    setAddModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmGoal) {
      await deleteSavingsGoal(deleteConfirmGoal._id)
      setDeleteConfirmGoal(null)
    }
  }

  const getDaysLeft = (targetDateStr) => {
    if (!targetDateStr) return null
    const target = new Date(targetDateStr)
    const now = new Date()
    const diffTime = target - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return 'Deadline passed'
    if (diffDays === 0) return 'Due today'
    return `${diffDays} days left`
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Savings Goals & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build discipline by allocating funds towards specific student milestones and emergency reserves.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleCreate}>
          <Plus className="w-4 h-4" />
          <span>New Savings Goal</span>
        </Button>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Saved */}
        <div className="p-5 rounded-2xl bg-[#0E1420] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Saved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-100 mt-3">
            {formatCurrency(savingsSummary.totalSaved)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Accumulated student funds</p>
        </div>

        {/* Total Target */}
        <div className="p-5 rounded-2xl bg-[#0E1420] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Target</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-100 mt-3">
            {formatCurrency(savingsSummary.totalTarget)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Across all planned milestones</p>
        </div>

        {/* Goals Progress */}
        <div className="p-5 rounded-2xl bg-[#0E1420] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Overall Progress</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-100 mt-3">
            {savingsSummary.overallPercentage}%
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {formatCurrency(Math.max(0, savingsSummary.totalTarget - savingsSummary.totalSaved))} remaining
          </p>
        </div>

        {/* Completed Milestones */}
        <div className="p-5 rounded-2xl bg-[#0E1420] border border-white/[0.08] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Milestones Reached</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-100 mt-3">
            {savingsSummary.completedGoals} <span className="text-sm font-normal text-slate-400">/ {savingsSummary.totalGoals}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Goals fully funded</p>
        </div>
      </div>

      {/* Goals Grid */}
      {savingsGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savingsGoals.map((goal) => {
            const percent = goal.targetAmount > 0 ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100)) : 0
            const remaining = Math.max(0, goal.targetAmount - goal.currentAmount)
            const isCompleted = goal.isCompleted || goal.currentAmount >= goal.targetAmount
            const daysLeft = getDaysLeft(goal.targetDate)

            return (
              <motion.div
                key={goal._id}
                layout
                className="p-5 rounded-2xl bg-[#0E1420] border border-white/[0.08] hover:border-white/[0.14] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Category Pill & Menu */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium border"
                      style={{
                        backgroundColor: `${goal.color || '#3B82F6'}15`,
                        borderColor: `${goal.color || '#3B82F6'}30`,
                        color: goal.color || '#60A5FA'
                      }}
                    >
                      {goal.category || 'Goal'}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(goal)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
                        title="Edit Goal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmGoal(goal)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-semibold text-slate-100 tracking-tight leading-snug">
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {goal.description}
                    </p>
                  )}

                  {/* Amounts */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">Saved</p>
                      <p className="text-lg font-bold font-mono text-slate-100 mt-0.5">
                        {formatCurrency(goal.currentAmount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider">Target</p>
                      <p className="text-sm font-semibold font-mono text-slate-400 mt-0.5">
                        {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-3">
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: isCompleted ? '#10B981' : (goal.color || '#3B82F6')
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                      <span>{percent}% funded</span>
                      <span>{isCompleted ? 'Goal Reached!' : `${formatCurrency(remaining)} to go`}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Meta & Deposit Action */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  {daysLeft ? (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{daysLeft}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">Flexible target date</span>
                  )}

                  <Button
                    variant={isCompleted ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => setDepositGoal(goal)}
                    className="text-xs py-1.5 px-3"
                  >
                    <span>{isCompleted ? 'Add More' : 'Deposit'}</span>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-[#0E1420] border border-white/[0.08] max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <PiggyBank className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-100">No Savings Goals Yet</h3>
          <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
            Set aside money for a new semester laptop, course certifications, hostel deposits, or an emergency buffer.
          </p>
          <div className="mt-5">
            <Button variant="primary" size="sm" onClick={handleCreate}>
              <Plus className="w-4 h-4" />
              <span>Create Your First Goal</span>
            </Button>
          </div>
        </div>
      )}

      {/* Add / Edit Goal Modal */}
      <AddSavingsGoalModal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false)
          setEditingGoal(null)
        }}
        initialData={editingGoal}
      />

      {/* Deposit Modal */}
      <DepositModal
        isOpen={Boolean(depositGoal)}
        onClose={() => setDepositGoal(null)}
        goal={depositGoal}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmGoal)}
        onClose={() => setDeleteConfirmGoal(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Savings Goal"
        message={`Are you sure you want to remove "${deleteConfirmGoal?.title}"? Any accumulated savings will remain in your recorded transactions.`}
        confirmText="Remove Goal"
        isDanger={true}
      />
    </div>
  )
}
