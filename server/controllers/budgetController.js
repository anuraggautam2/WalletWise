import { budgetStore } from '../utils/store.js'

// -------------------------------------------------------------
// GET /api/budgets
// -------------------------------------------------------------
export const getBudgets = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const now = new Date()
    const month = req.query.month ? parseInt(req.query.month) : now.getMonth() + 1
    const year = req.query.year ? parseInt(req.query.year) : now.getFullYear()

    const data = await budgetStore.getBudgetsWithProgress(userId, month, year)

    res.status(200).json({
      success: true,
      data
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/budgets
// -------------------------------------------------------------
export const setBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { budgetType = 'overall', category, amount, month, year } = req.body

    const budget = await budgetStore.setBudget({
      userId,
      budgetType,
      category: budgetType === 'overall' ? 'Overall' : category,
      amount,
      month,
      year
    })

    res.status(201).json({
      success: true,
      message: `${budgetType === 'overall' ? 'Monthly' : category} budget configured successfully!`,
      data: budget
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// DELETE /api/budgets/:id
// -------------------------------------------------------------
export const deleteBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const deleted = await budgetStore.delete(req.params.id, userId)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Budget record not found or you do not have permission to delete it.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Budget removed successfully!'
    })
  } catch (err) {
    next(err)
  }
}
