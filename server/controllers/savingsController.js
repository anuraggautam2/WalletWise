import { savingsStore } from '../utils/store.js'

// -------------------------------------------------------------
// GET /api/savings
// -------------------------------------------------------------
export const getSavingsGoals = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const goals = await savingsStore.find(userId)

    // Calculate aggregated savings statistics
    const totalTarget = goals.reduce((sum, g) => sum + (Number(g.targetAmount) || 0), 0)
    const totalSaved = goals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0)
    const completedCount = goals.filter((g) => g.isCompleted || (g.currentAmount >= g.targetAmount)).length

    res.status(200).json({
      success: true,
      data: goals,
      summary: {
        totalGoals: goals.length,
        completedGoals: completedCount,
        totalTarget,
        totalSaved,
        overallPercentage: totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0
      }
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/savings
// -------------------------------------------------------------
export const createSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { title, targetAmount, currentAmount = 0, targetDate, category, color, description } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a title for your savings goal.' })
    }

    const numTarget = parseFloat(targetAmount)
    if (isNaN(numTarget) || numTarget <= 0) {
      return res.status(400).json({ success: false, message: 'Target amount must be a number greater than 0.' })
    }

    const goal = await savingsStore.create({
      userId,
      title: title.trim(),
      targetAmount: numTarget,
      currentAmount: parseFloat(currentAmount) || 0,
      targetDate: targetDate || null,
      category: category || 'Other',
      color: color || '#3B82F6',
      description: description ? description.trim() : ''
    })

    res.status(201).json({
      success: true,
      message: 'Savings goal created successfully!',
      data: goal
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// PUT /api/savings/:id
// -------------------------------------------------------------
export const updateSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const updates = req.body

    const updated = await savingsStore.update(req.params.id, userId, updates)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found or you do not have permission to modify it.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Savings goal updated successfully!',
      data: updated
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/savings/:id/deposit
// -------------------------------------------------------------
export const addSavingsDeposit = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { amount } = req.body

    const depositAmount = parseFloat(amount)
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Deposit amount must be greater than zero.' })
    }

    const updated = await savingsStore.deposit(req.params.id, userId, depositAmount)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found or you do not have permission to deposit into it.'
      })
    }

    res.status(200).json({
      success: true,
      message: `Successfully contributed to ${updated.title}!`,
      data: updated
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// DELETE /api/savings/:id
// -------------------------------------------------------------
export const deleteSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const deleted = await savingsStore.delete(req.params.id, userId)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Savings goal not found or you do not have permission to delete it.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Savings goal removed successfully!'
    })
  } catch (err) {
    next(err)
  }
}
