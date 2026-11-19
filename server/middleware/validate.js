import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '../models/Transaction.js'

// Simple sanitization against XSS & script tags
export const sanitize = (str) => {
  if (typeof str !== 'string') return str
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim()
}

export const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Please provide your full name (at least 2 characters).' })
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' })
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' })
  }

  req.body.name = sanitize(name)
  req.body.email = email.toLowerCase().trim()
  next()
}

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' })
  }

  req.body.email = email.toLowerCase().trim()
  next()
}

export const validateTransaction = (req, res, next) => {
  const { type, title, amount, category, paymentMethod, date, description } = req.body

  if (!type || !['income', 'expense'].includes(type)) {
    return res.status(400).json({ success: false, message: "Type must be either 'income' or 'expense'." })
  }

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide a title for this record.' })
  }

  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Please enter a valid amount greater than zero.' })
  }

  const validCategories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
    })
  }

  if (paymentMethod && !PAYMENT_METHODS.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: `Invalid payment method. Must be one of: ${PAYMENT_METHODS.join(', ')}`
    })
  }

  req.body.title = sanitize(title)
  req.body.amount = numAmount
  req.body.description = description ? sanitize(description) : ''
  req.body.date = date ? new Date(date) : new Date()
  next()
}

export const validateBudget = (req, res, next) => {
  const { budgetType = 'overall', category, amount, month, year } = req.body

  if (!['overall', 'category'].includes(budgetType)) {
    return res.status(400).json({ success: false, message: "Budget type must be 'overall' or 'category'." })
  }

  if (budgetType === 'category') {
    if (!category || !EXPENSE_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Please select a valid expense category: ${EXPENSE_CATEGORIES.join(', ')}`
      })
    }
  }

  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Please provide a budget amount greater than zero.' })
  }

  const numMonth = parseInt(month)
  const numYear = parseInt(year)

  if (isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return res.status(400).json({ success: false, message: 'Month must be between 1 and 12.' })
  }
  if (isNaN(numYear) || numYear < 2020 || numYear > 2050) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 4-digit year.' })
  }

  req.body.amount = numAmount
  req.body.month = numMonth
  req.body.year = numYear
  next()
}
