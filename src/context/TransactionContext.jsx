import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const { isAuthenticated, user } = useAuth()

  const [transactions, setTransactions] = useState([])
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 })
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    categoryBreakdown: [],
    weeklyBreakdown: [],
    dailyBreakdown: [],
    recentTransactions: [],
  })
  const [budgets, setBudgets] = useState({
    overallBudget: null,
    categoryBudgets: [],
    totalBudgeted: 0,
    totalSpent: 0,
  })
  const [savingsGoals, setSavingsGoals] = useState([])
  const [savingsSummary, setSavingsSummary] = useState({
    totalGoals: 0,
    completedGoals: 0,
    totalTarget: 0,
    totalSaved: 0,
    overallPercentage: 0
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) // { message, type: 'success' | 'error' | 'info' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }, [])

  // Dynamic currency formatter matching user profile
  const formatCurrency = useCallback((val) => {
    const num = Number(val) || 0
    const currency = user?.currency || 'INR'
    const symbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£'
    }
    const symbol = symbols[currency] || '₹'
    const locale = currency === 'INR' ? 'en-IN' : 'en-US'
    return `${symbol}${num.toLocaleString(locale, { maximumFractionDigits: 0 })}`
  }, [user?.currency])

  const refreshData = useCallback(async (filters = {}) => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const [statsRes, txRes, budgetRes, savingsRes] = await Promise.all([
        api.getTransactionStats(),
        api.getTransactions(filters),
        api.getBudgets(),
        api.getSavingsGoals(),
      ])

      if (statsRes.success) setStats(statsRes.data)
      if (txRes.success) {
        setTransactions(txRes.data)
        if (txRes.pagination) setPagination(txRes.pagination)
      }
      if (budgetRes.success) setBudgets(budgetRes.data)
      if (savingsRes.success) {
        setSavingsGoals(savingsRes.data || [])
        if (savingsRes.summary) setSavingsSummary(savingsRes.summary)
      }
    } catch (err) {
      console.error('Failed to load transaction data:', err)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      refreshData()
    } else {
      setTransactions([])
      setStats({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        monthlyIncome: 0,
        monthlyExpense: 0,
        categoryBreakdown: [],
        weeklyBreakdown: [],
        dailyBreakdown: [],
        recentTransactions: [],
      })
      setBudgets({ overallBudget: null, categoryBudgets: [], totalBudgeted: 0, totalSpent: 0 })
      setSavingsGoals([])
      setSavingsSummary({ totalGoals: 0, completedGoals: 0, totalTarget: 0, totalSaved: 0, overallPercentage: 0 })
    }
  }, [isAuthenticated, refreshData])

  const addTransaction = async (data) => {
    try {
      const res = await api.createTransaction(data)
      if (res.success) {
        showToast(res.message, 'success')
        await refreshData()
        return { success: true, data: res.data }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const editTransaction = async (id, data) => {
    try {
      const res = await api.updateTransaction(id, data)
      if (res.success) {
        showToast('Transaction updated successfully!', 'success')
        await refreshData()
        return { success: true, data: res.data }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const deleteTransaction = async (id) => {
    try {
      const res = await api.deleteTransaction(id)
      if (res.success) {
        showToast('Transaction deleted successfully!', 'success')
        await refreshData()
        return { success: true }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const setBudget = async (budgetData) => {
    try {
      const res = await api.setBudget(budgetData)
      if (res.success) {
        showToast(res.message, 'success')
        await refreshData()
        return { success: true, data: res.data }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const deleteBudget = async (id) => {
    try {
      const res = await api.deleteBudget(id)
      if (res.success) {
        showToast('Budget deleted successfully!', 'success')
        await refreshData()
        return { success: true }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const addSavingsGoal = async (goalData) => {
    try {
      const res = await api.createSavingsGoal(goalData)
      if (res.success) {
        showToast(res.message, 'success')
        await refreshData()
        return { success: true, data: res.data }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const updateSavingsGoal = async (id, goalData) => {
    try {
      const res = await api.updateSavingsGoal(id, goalData)
      if (res.success) {
        showToast(res.message || 'Savings goal updated!', 'success')
        await refreshData()
        return { success: true }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const addSavingsDeposit = async (id, amount) => {
    try {
      const res = await api.addSavingsDeposit(id, amount)
      if (res.success) {
        showToast(res.message, 'success')
        await refreshData()
        return { success: true, data: res.data }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const deleteSavingsGoal = async (id) => {
    try {
      const res = await api.deleteSavingsGoal(id)
      if (res.success) {
        showToast(res.message || 'Savings goal removed.', 'success')
        await refreshData()
        return { success: true }
      }
    } catch (err) {
      showToast(err.message, 'error')
      return { success: false, message: err.message }
    }
  }

  const exportCSV = async () => {
    try {
      await api.exportTransactionsCSV()
      showToast('Transaction CSV exported successfully!', 'success')
    } catch (err) {
      showToast('Failed to export transactions.', 'error')
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        pagination,
        stats,
        budgets,
        savingsGoals,
        savingsSummary,
        loading,
        toast,
        showToast,
        formatCurrency,
        refreshData,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setBudget,
        deleteBudget,
        addSavingsGoal,
        updateSavingsGoal,
        addSavingsDeposit,
        deleteSavingsGoal,
        exportCSV,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionContext)
