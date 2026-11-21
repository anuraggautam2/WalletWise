import React, { useState } from 'react'
import {
  Target,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  TrendingDown,
  Info,
  Calendar,
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import CategoryIcon from '../ui/CategoryIcon'
import ConfirmDialog from './ConfirmDialog'
import { useTransactions } from '../../context/TransactionContext'

export default function BudgetsTab({ onOpenAddBudgetModal }) {
  const { budgets, deleteBudget, formatCurrency } = useTransactions()

  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const currentDay = today.getDate()
  const monthProgress = Math.round((currentDay / daysInMonth) * 100)

  const handleDelete = async () => {
    if (!deleteTargetId) return
    setDeleteLoading(true)
    await deleteBudget(deleteTargetId)
    setDeleteLoading(false)
    setDeleteTargetId(null)
  }

  const overall = budgets.overallBudget
  const categoryBudgets = budgets.categoryBudgets || []

  // Calculate status styling helper
  const getStatusMeta = (status) => {
    switch (status) {
      case 'exceeded':
        return {
          barColor: 'bg-red-500',
          textColor: 'text-red-400',
          bgColor: 'bg-red-500/10 border-red-500/20',
          label: 'Budget Exceeded',
        }
      case 'warning':
        return {
          barColor: 'bg-amber-500',
          textColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10 border-amber-500/20',
          label: 'Approaching Limit',
        }
      default:
        return {
          barColor: 'bg-brand-blue',
          textColor: 'text-brand-blue-light',
          bgColor: 'bg-blue-500/10 border-blue-500/20',
          label: 'On Track',
        }
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
            Monthly Budget Targets
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Set overall and category spending boundaries to maintain healthy student pacing.
          </p>
        </div>

        <Button variant="primary" onClick={onOpenAddBudgetModal}>
          <Plus className="w-4 h-4" />
          <span>Set Budget</span>
        </Button>
      </div>

      {/* Main Overall Monthly Budget Card */}
      {overall ? (
        <Card className="p-6 sm:p-8" glow glowColor="blue">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Overall Monthly Allowance Limit
                </span>
                <h3 className="text-2xl font-extrabold text-text-main mt-0.5">
                  {formatCurrency(overall.amount)}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusMeta(overall.status).bgColor} ${
                  getStatusMeta(overall.status).textColor
                }`}
              >
                {getStatusMeta(overall.status).label} &bull; {overall.percentage}%
              </span>
              <button
                onClick={() => setDeleteTargetId(overall._id)}
                className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Remove budget target"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar & Details */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-text-secondary">
                Spent: <strong className="text-text-main font-bold">{formatCurrency(overall.spent)}</strong>
              </span>
              <span className={getStatusMeta(overall.status).textColor}>
                Remaining: <strong>{formatCurrency(overall.remaining)}</strong>
              </span>
            </div>

            <div className="w-full bg-dark-secondary h-3 rounded-full overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getStatusMeta(overall.status).barColor}`}
                style={{ width: `${Math.min(100, overall.percentage)}%` }}
              />
            </div>
          </div>

          {/* Pacing Advice & Timeline Progress */}
          <div className="mt-6 p-4 rounded-xl bg-dark-secondary/60 border border-dark-border/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <span>Month Timeline: Day {currentDay} of {daysInMonth} ({monthProgress}%)</span>
              <span className={overall.percentage > monthProgress ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                {overall.percentage > monthProgress ? `${overall.percentage - monthProgress}% faster than timeline` : `${monthProgress - overall.percentage}% buffer remaining`}
              </span>
            </div>
            <div className="w-full bg-dark-card h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-purple-500/60 h-1.5 rounded-full"
                style={{ width: `${monthProgress}%` }}
                title="Current day in month"
              />
            </div>
            <div className="flex items-start gap-3 pt-1">
              <Info className="w-4 h-4 text-brand-blue-light mt-0.5 shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">
                {overall.percentage >= 100 ? (
                  <span className="text-red-400 font-semibold">
                    Alert: You have exceeded your overall monthly budget by {formatCurrency(overall.spent - overall.amount)}. Consider pausing non-essential spending.
                  </span>
                ) : overall.percentage >= 80 ? (
                  <span className="text-amber-400 font-semibold">
                    Caution: You have utilized {overall.percentage}% of your monthly allowance with {daysInMonth - currentDay} days remaining. Maintain essential expenses only.
                  </span>
                ) : (
                  <span>
                    Great job! You are pacing well within your monthly allocation with <strong>{formatCurrency(overall.remaining)}</strong> remaining safe spend.
                  </span>
                )}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        /* Empty Overall Budget Prompt */
        <Card className="p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text-main">No Monthly Budget Configured</h3>
          <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto mt-1 leading-relaxed">
            Set an overall monthly spending allowance to track your daily progress and get timely pacing warnings.
          </p>
          <div className="mt-5">
            <Button variant="primary" size="sm" onClick={onOpenAddBudgetModal}>
              <Plus className="w-4 h-4" />
              <span>Set Overall Budget</span>
            </Button>
          </div>
        </Card>
      )}

      {/* Category Budgets Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-text-main">
            Category Spending Limits ({categoryBudgets.length})
          </h3>
          <Button variant="outline" size="sm" onClick={onOpenAddBudgetModal}>
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category Limit</span>
          </Button>
        </div>

        {categoryBudgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryBudgets.map((b) => {
              const meta = getStatusMeta(b.status)
              return (
                <Card key={b._id} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <CategoryIcon category={b.category} size="md" />
                        <div>
                          <h4 className="text-sm font-bold text-text-main leading-tight">{b.category}</h4>
                          <span className="text-[11px] text-text-muted">Target: {formatCurrency(b.amount)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteTargetId(b._id)}
                        className="p-1 rounded text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-text-muted">Spent: {formatCurrency(b.spent)}</span>
                        <span className={`font-bold ${meta.textColor}`}>{b.percentage}%</span>
                      </div>
                      <div className="w-full bg-dark-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${meta.barColor}`}
                          style={{ width: `${Math.min(100, b.percentage)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between text-xs">
                    <span className="text-text-muted">Remaining:</span>
                    <span className={`font-bold ${meta.textColor}`}>{formatCurrency(b.remaining)}</span>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-6 text-center text-text-muted">
            <p className="text-xs text-text-muted">No category limits set yet. Add limits for Food, Transit, Books, or Leisure.</p>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        loading={deleteLoading}
        title="Delete Budget Target"
        message="Are you sure you want to remove this budget target? You can re-add it at any time."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
