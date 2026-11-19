import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
  Trash2,
  Edit2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  X,
  FileSpreadsheet,
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import CategoryIcon from '../ui/CategoryIcon'
import ConfirmDialog from './ConfirmDialog'
import { useTransactions } from '../../context/TransactionContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../server/models/Transaction.js'

export default function TransactionsTab({ onOpenAddModal, onEditTransaction }) {
  const { transactions, pagination, refreshData, deleteTransaction, loading } = useTransactions()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [type, setType] = useState('All') // 'All' | 'expense' | 'income'
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [page, setPage] = useState(1)

  // Deletion modal state
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Trigger query on filter change
  useEffect(() => {
    refreshData({
      search,
      category,
      type,
      sortBy,
      sortOrder,
      page,
      limit: 15,
    })
  }, [search, category, type, sortBy, sortOrder, page, refreshData])

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return
    setDeleteLoading(true)
    await deleteTransaction(deleteTargetId)
    setDeleteLoading(false)
    setDeleteTargetId(null)
  }

  // Export to CSV
  const handleExportCSV = () => {
    if (!transactions.length) return

    const headers = ['Type', 'Title', 'Amount (INR)', 'Category', 'Date', 'Payment Method', 'Description']
    const rows = transactions.map((t) => [
      t.type,
      `"${t.title.replace(/"/g, '""')}"`,
      t.amount,
      t.category,
      new Date(t.date).toLocaleDateString(),
      t.paymentMethod || 'UPI',
      `"${(t.description || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `walletwise_transactions_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const allCategories = ['All', ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]
  const uniqueCategories = Array.from(new Set(allCategories))

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Controls: Search, Filters & Action */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search expenses by title or note..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs sm:text-sm placeholder:text-text-subtle focus:outline-none focus:border-brand-blue transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Type selector */}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setPage(1)
              }}
              className="px-3 py-2 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors"
            >
              <option value="All">All Types</option>
              <option value="expense">Expenses Only</option>
              <option value="income">Income Only</option>
            </select>

            {/* Category selector */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setPage(1)
              }}
              className="px-3 py-2 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-xs focus:outline-none focus:border-brand-blue transition-colors max-w-[150px]"
            >
              {uniqueCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Sort order toggle */}
            <button
              onClick={() => {
                setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
              }}
              className="px-3 py-2 rounded-xl bg-dark-secondary border border-dark-border text-text-secondary hover:text-text-main text-xs flex items-center gap-1.5 transition-colors"
              title="Toggle sort direction"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>

            {/* Export CSV */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={transactions.length === 0}
              title="Export filtered list to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </Button>

            {/* Add Expense Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenAddModal('expense')}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions Table / List */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-secondary/80 border-b border-dark-border text-text-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Transaction</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-dark-secondary/30 transition-colors group"
                  >
                    {/* Title + Note */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <CategoryIcon category={tx.category} size="sm" />
                        <div>
                          <p className="font-semibold text-text-main text-sm leading-tight">{tx.title}</p>
                          {tx.description && (
                            <p className="text-[11px] text-text-muted mt-0.5 truncate max-w-xs">{tx.description}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category Tag */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-dark-secondary border border-dark-border font-medium text-text-secondary">
                        {tx.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] text-text-muted font-medium">
                        {tx.paymentMethod || 'UPI'}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap font-extrabold text-sm">
                      <span className={tx.type === 'income' ? 'text-emerald-400' : 'text-text-main'}>
                        {tx.type === 'income' ? '+' : '-'}₹{(tx.amount || 0).toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* Edit & Delete Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditTransaction(tx)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-brand-blue-light hover:bg-dark-secondary transition-colors"
                          title="Edit transaction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(tx._id)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-text-muted">
                    <p className="text-sm font-semibold text-text-secondary">No transactions match your query</p>
                    <p className="text-xs text-text-muted mt-1">Try clearing filters or search keywords.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="p-4 bg-dark-secondary/60 border-t border-dark-border flex items-center justify-between text-xs text-text-muted">
            <span>
              Showing page <strong className="text-text-main">{pagination.page}</strong> of{' '}
              <strong className="text-text-main">{pagination.totalPages}</strong> ({pagination.total} total)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        loading={deleteLoading}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction record? This will instantly recalculate your balance and monthly budget."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
