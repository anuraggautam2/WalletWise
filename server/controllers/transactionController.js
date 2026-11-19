import { transactionStore } from '../utils/store.js'

// -------------------------------------------------------------
// GET /api/transactions
// -------------------------------------------------------------
export const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { category, type, startDate, endDate, search, limit, page, sortBy, sortOrder } = req.query

    const result = await transactionStore.find(userId, {
      category,
      type,
      startDate,
      endDate,
      search,
      limit: limit ? parseInt(limit) : 50,
      page: page ? parseInt(page) : 1,
      sortBy: sortBy || 'date',
      sortOrder: sortOrder || 'desc'
    })

    res.status(200).json({
      success: true,
      data: result.transactions,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/transactions
// -------------------------------------------------------------
export const createTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { type, title, amount, category, paymentMethod, date, description } = req.body

    const transaction = await transactionStore.create({
      userId,
      type,
      title,
      amount,
      category,
      paymentMethod,
      date,
      description
    })

    res.status(201).json({
      success: true,
      message: `${type === 'income' ? 'Income' : 'Expense'} recorded successfully!`,
      data: transaction
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// GET /api/transactions/:id
// -------------------------------------------------------------
export const getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const transaction = await transactionStore.findById(req.params.id, userId)

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found or you do not have permission to view it.'
      })
    }

    res.status(200).json({
      success: true,
      data: transaction
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// PUT /api/transactions/:id
// -------------------------------------------------------------
export const updateTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const updates = req.body

    const updated = await transactionStore.update(req.params.id, userId, updates)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found or you do not have permission to update it.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully!',
      data: updated
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// DELETE /api/transactions/:id
// -------------------------------------------------------------
export const deleteTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const deleted = await transactionStore.delete(req.params.id, userId)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found or you do not have permission to delete it.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully!'
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// GET /api/transactions/stats
// -------------------------------------------------------------
export const getTransactionStats = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { month, year } = req.query

    const stats = await transactionStore.getStats(userId, month, year)

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (err) {
    next(err)
  }
}
