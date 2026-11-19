import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const { isAuthenticated } = useAuth()

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
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) // { message, type: 'success' | 'error' | 'info' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }, [])

  const refreshData = useCallback(async (filters = {}) => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const [statsRes, txRes, budgetRes] = await Promise.all([
        api.getTransactionStats(),
        api.getTransactions(filters),
        api.getBudgets(),
      ])

      if (statsRes.success) setStats(statsRes.data)
      if (txRes.success) {
        setTransactions(txRes.data)
        if (txRes.pagination) setPagination(txRes.pagination)
      }
      if (budgetRes.success) setBudgets(budgetRes.data)
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

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        pagination,
        stats,
        budgets,
        loading,
        toast,
        showToast,
        refreshData,
        addTransaction,
        editTransaction,
        deleteTransaction,
        setBudget,
        deleteBudget,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionContext)
