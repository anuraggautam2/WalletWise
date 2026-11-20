import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Transaction from '../models/Transaction.js'
import Budget from '../models/Budget.js'
import { getDBStatus } from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DEFAULT_DATA_DIR = path.join(__dirname, '../data')
const DEFAULT_DATA_FILE = path.join(DEFAULT_DATA_DIR, 'store.json')

// If running in Vercel or read-only serverless, use /tmp which is writable
const isVercel = Boolean(process.env.VERCEL)
const DATA_DIR = isVercel ? path.join('/tmp', 'walletwise-data') : DEFAULT_DATA_DIR
const DATA_FILE = path.join(DATA_DIR, 'store.json')

// Ensure local persistence data directory and initial schema
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (isVercel && !fs.existsSync(DATA_FILE) && fs.existsSync(DEFAULT_DATA_FILE)) {
    fs.copyFileSync(DEFAULT_DATA_FILE, DATA_FILE)
  }
} catch (err) {
  console.error('Notice: error initializing local store directory:', err.message)
}

const loadLocalData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8')
      return JSON.parse(raw)
    }
    if (fs.existsSync(DEFAULT_DATA_FILE)) {
      const raw = fs.readFileSync(DEFAULT_DATA_FILE, 'utf8')
      return JSON.parse(raw)
    }
  } catch (err) {
    console.error('Error reading local store:', err)
  }
  return { users: [], transactions: [], budgets: [] }
}

const saveLocalData = (data) => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing local store:', err)
  }
}

// -------------------------------------------------------------
// USER OPERATIONS
// -------------------------------------------------------------
export const userStore = {
  async findByEmail(email) {
    const normalized = email.toLowerCase().trim()
    if (getDBStatus()) {
      return await User.findOne({ email: normalized }).select('+password')
    }
    const data = loadLocalData()
    return data.users.find((u) => u.email === normalized) || null
  },

  async findById(id) {
    if (getDBStatus()) {
      return await User.findById(id).select('-password')
    }
    const data = loadLocalData()
    const user = data.users.find((u) => u._id === id || u.id === id)
    if (!user) return null
    const { password, ...rest } = user
    return rest
  },

  async create({ name, email, password, currency = 'INR', dateFormat = 'DD/MM/YYYY' }) {
    const normalized = email.toLowerCase().trim()
    if (getDBStatus()) {
      const user = await User.create({ name, email: normalized, password, currency, dateFormat })
      return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        currency: user.currency,
        dateFormat: user.dateFormat,
        createdAt: user.createdAt
      }
    }

    const data = loadLocalData()
    if (data.users.some((u) => u.email === normalized)) {
      throw new Error('An account with this email already exists')
    }

    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = {
      _id: 'usr_' + crypto.randomUUID().slice(0, 12),
      name: name.trim(),
      email: normalized,
      password: hashedPassword,
      currency,
      dateFormat,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    data.users.push(newUser)
    saveLocalData(data)

    const { password: _, ...cleanUser } = newUser
    return cleanUser
  },

  async update(id, updates) {
    if (getDBStatus()) {
      return await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password')
    }

    const data = loadLocalData()
    const index = data.users.findIndex((u) => u._id === id || u.id === id)
    if (index === -1) return null

    if (updates.password) {
      const salt = await bcrypt.genSalt(12)
      updates.password = await bcrypt.hash(updates.password, salt)
    }

    data.users[index] = {
      ...data.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    saveLocalData(data)

    const { password: _, ...cleanUser } = data.users[index]
    return cleanUser
  },

  async saveResetToken(email, token, expires) {
    if (getDBStatus()) {
      return await User.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { resetPasswordToken: token, resetPasswordExpires: expires },
        { new: true }
      )
    }
    const data = loadLocalData()
    const user = data.users.find((u) => u.email === email.toLowerCase().trim())
    if (!user) return null
    user.resetPasswordToken = token
    user.resetPasswordExpires = expires
    saveLocalData(data)
    return user
  },

  async findByResetToken(token) {
    if (getDBStatus()) {
      return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      })
    }
    const data = loadLocalData()
    return data.users.find((u) => u.resetPasswordToken === token && new Date(u.resetPasswordExpires) > new Date()) || null
  }
}

// -------------------------------------------------------------
// TRANSACTION OPERATIONS (Income & Expense)
// -------------------------------------------------------------
export const transactionStore = {
  async create(payload) {
    if (getDBStatus()) {
      return await Transaction.create(payload)
    }

    const data = loadLocalData()
    const newTx = {
      _id: 'tx_' + crypto.randomUUID().slice(0, 14),
      userId: payload.userId.toString(),
      type: payload.type, // 'income' or 'expense'
      title: payload.title.trim(),
      amount: parseFloat(payload.amount),
      category: payload.category,
      date: payload.date ? new Date(payload.date).toISOString() : new Date().toISOString(),
      paymentMethod: payload.paymentMethod || 'UPI',
      description: payload.description ? payload.description.trim() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    data.transactions.unshift(newTx)
    saveLocalData(data)
    return newTx
  },

  async find(userId, options = {}) {
    const { category, type, startDate, endDate, search, limit = 50, page = 1, sortBy = 'date', sortOrder = 'desc' } = options

    if (getDBStatus()) {
      const query = { userId }
      if (category && category !== 'All') query.category = category
      if (type && type !== 'All') query.type = type
      if (startDate || endDate) {
        query.date = {}
        if (startDate) query.date.$gte = new Date(startDate)
        if (endDate) query.date.$lte = new Date(endDate)
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }

      const total = await Transaction.countDocuments(query)
      const transactions = await Transaction.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)

      return { transactions, total, page, totalPages: Math.ceil(total / limit) || 1 }
    }

    // Local fallback
    const data = loadLocalData()
    let list = data.transactions.filter((t) => t.userId === userId.toString())

    if (category && category !== 'All') {
      list = list.filter((t) => t.category.toLowerCase() === category.toLowerCase())
    }
    if (type && type !== 'All') {
      list = list.filter((t) => t.type.toLowerCase() === type.toLowerCase())
    }
    if (startDate) {
      const start = new Date(startDate)
      list = list.filter((t) => new Date(t.date) >= start)
    }
    if (endDate) {
      const end = new Date(endDate)
      list = list.filter((t) => new Date(t.date) <= end)
    }
    if (search) {
      const s = search.toLowerCase()
      list = list.filter(
        (t) => t.title.toLowerCase().includes(s) || (t.description && t.description.toLowerCase().includes(s))
      )
    }

    // Sorting
    list.sort((a, b) => {
      const valA = a[sortBy]
      const valB = b[sortBy]
      if (sortBy === 'date' || sortBy === 'createdAt') {
        const diff = new Date(valA) - new Date(valB)
        return sortOrder === 'asc' ? diff : -diff
      }
      if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

    const total = list.length
    const paginated = list.slice((page - 1) * limit, page * limit)

    return {
      transactions: paginated,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit) || 1
    }
  },

  async findById(id, userId) {
    if (getDBStatus()) {
      return await Transaction.findOne({ _id: id, userId })
    }
    const data = loadLocalData()
    return data.transactions.find((t) => t._id === id && t.userId === userId.toString()) || null
  },

  async update(id, userId, updates) {
    if (getDBStatus()) {
      return await Transaction.findOneAndUpdate({ _id: id, userId }, updates, { new: true, runValidators: true })
    }
    const data = loadLocalData()
    const index = data.transactions.findIndex((t) => t._id === id && t.userId === userId.toString())
    if (index === -1) return null

    if (updates.amount) updates.amount = parseFloat(updates.amount)
    if (updates.title) updates.title = updates.title.trim()

    data.transactions[index] = {
      ...data.transactions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    saveLocalData(data)
    return data.transactions[index]
  },

  async delete(id, userId) {
    if (getDBStatus()) {
      return await Transaction.findOneAndDelete({ _id: id, userId })
    }
    const data = loadLocalData()
    const index = data.transactions.findIndex((t) => t._id === id && t.userId === userId.toString())
    if (index === -1) return null

    const [deleted] = data.transactions.splice(index, 1)
    saveLocalData(data)
    return deleted
  },

  // Aggregated analytics
  async getStats(userId, month, year) {
    const now = new Date()
    const targetMonth = month ? parseInt(month) : now.getMonth() + 1
    const targetYear = year ? parseInt(year) : now.getFullYear()

    const startOfMonth = new Date(targetYear, targetMonth - 1, 1)
    const endOfMonth = new Date(targetYear, targetMonth, 0, 23, 59, 59, 999)

    let allUserTx = []
    if (getDBStatus()) {
      allUserTx = await Transaction.find({ userId }).sort({ date: -1 })
    } else {
      const data = loadLocalData()
      allUserTx = data.transactions.filter((t) => t.userId === userId.toString())
    }

    let totalIncome = 0
    let totalExpense = 0
    let monthlyIncome = 0
    let monthlyExpense = 0
    const categoryTotals = {}
    const weeklyTotals = { Week1: 0, Week2: 0, Week3: 0, Week4: 0, Week5: 0 }
    const dailyExpenses = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    allUserTx.forEach((tx) => {
      const txDate = new Date(tx.date)
      const amount = parseFloat(tx.amount) || 0

      // Overall lifetime totals
      if (tx.type === 'income') {
        totalIncome += amount
      } else if (tx.type === 'expense') {
        totalExpense += amount
      }

      // Current selected month
      if (txDate >= startOfMonth && txDate <= endOfMonth) {
        if (tx.type === 'income') {
          monthlyIncome += amount
        } else if (tx.type === 'expense') {
          monthlyExpense += amount

          // Category distribution
          categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amount

          // Weekly distribution
          const day = txDate.getDate()
          const week = Math.min(Math.ceil(day / 7), 5)
          weeklyTotals[`Week${week}`] = (weeklyTotals[`Week${week}`] || 0) + amount

          // Day of week
          const dayName = daysMap[txDate.getDay()]
          dailyExpenses[dayName] = (dailyExpenses[dayName] || 0) + amount
        }
      }
    })

    const balance = totalIncome - totalExpense

    return {
      totalIncome,
      totalExpense,
      balance,
      monthlyIncome,
      monthlyExpense,
      categoryBreakdown: Object.keys(categoryTotals).map((cat) => ({
        category: cat,
        amount: categoryTotals[cat],
        percentage: monthlyExpense > 0 ? Math.round((categoryTotals[cat] / monthlyExpense) * 100) : 0
      })).sort((a, b) => b.amount - a.amount),
      weeklyBreakdown: Object.keys(weeklyTotals).map((w) => ({
        week: w,
        amount: weeklyTotals[w]
      })),
      dailyBreakdown: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => ({
        day: d,
        amount: dailyExpenses[d]
      })),
      recentTransactions: allUserTx.slice(0, 5),
      targetMonth,
      targetYear
    }
  }
}

// -------------------------------------------------------------
// BUDGET OPERATIONS
// -------------------------------------------------------------
export const budgetStore = {
  async setBudget({ userId, budgetType = 'overall', category = 'Overall', amount, month, year }) {
    const numAmount = parseFloat(amount)
    const numMonth = parseInt(month)
    const numYear = parseInt(year)

    if (getDBStatus()) {
      return await Budget.findOneAndUpdate(
        { userId, budgetType, category, month: numMonth, year: numYear },
        { amount: numAmount },
        { upsert: true, new: true, runValidators: true }
      )
    }

    const data = loadLocalData()
    const index = data.budgets.findIndex(
      (b) =>
        b.userId === userId.toString() &&
        b.budgetType === budgetType &&
        b.category.toLowerCase() === category.toLowerCase() &&
        b.month === numMonth &&
        b.year === numYear
    )

    if (index !== -1) {
      data.budgets[index].amount = numAmount
      data.budgets[index].updatedAt = new Date().toISOString()
      saveLocalData(data)
      return data.budgets[index]
    }

    const newBudget = {
      _id: 'bgt_' + crypto.randomUUID().slice(0, 12),
      userId: userId.toString(),
      budgetType,
      category,
      amount: numAmount,
      month: numMonth,
      year: numYear,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    data.budgets.push(newBudget)
    saveLocalData(data)
    return newBudget
  },

  async getBudgetsWithProgress(userId, month, year) {
    const numMonth = parseInt(month)
    const numYear = parseInt(year)
    const startOfMonth = new Date(numYear, numMonth - 1, 1)
    const endOfMonth = new Date(numYear, numMonth, 0, 23, 59, 59, 999)

    let budgets = []
    let expenses = []

    if (getDBStatus()) {
      budgets = await Budget.find({ userId, month: numMonth, year: numYear })
      expenses = await Transaction.find({
        userId,
        type: 'expense',
        date: { $gte: startOfMonth, $lte: endOfMonth }
      })
    } else {
      const data = loadLocalData()
      budgets = data.budgets.filter((b) => b.userId === userId.toString() && b.month === numMonth && b.year === numYear)
      expenses = data.transactions.filter((t) => {
        if (t.userId !== userId.toString() || t.type !== 'expense') return false
        const d = new Date(t.date)
        return d >= startOfMonth && d <= endOfMonth
      })
    }

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0)
    const categorySpending = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount
      return acc
    }, {})

    const items = budgets.map((b) => {
      const spent = b.budgetType === 'overall' ? totalExpense : categorySpending[b.category] || 0
      const remaining = Math.max(0, b.amount - spent)
      const percentage = b.amount > 0 ? Math.round((spent / b.amount) * 100) : 0
      let status = 'normal' // normal (blue), warning (orange), exceeded (red)
      if (percentage >= 100) status = 'exceeded'
      else if (percentage >= 80) status = 'warning'

      return {
        _id: b._id,
        budgetType: b.budgetType,
        category: b.category,
        amount: b.amount,
        spent,
        remaining,
        percentage,
        status,
        month: b.month,
        year: b.year
      }
    })

    const overallBudget = items.find((i) => i.budgetType === 'overall') || null
    const categoryBudgets = items.filter((i) => i.budgetType === 'category')

    return {
      overallBudget,
      categoryBudgets,
      totalBudgeted: (overallBudget ? overallBudget.amount : 0) + categoryBudgets.reduce((acc, b) => acc + b.amount, 0),
      totalSpent: totalExpense,
      month: numMonth,
      year: numYear
    }
  },

  async delete(id, userId) {
    if (getDBStatus()) {
      return await Budget.findOneAndDelete({ _id: id, userId })
    }
    const data = loadLocalData()
    const index = data.budgets.findIndex((b) => b._id === id && b.userId === userId.toString())
    if (index === -1) return null

    const [deleted] = data.budgets.splice(index, 1)
    saveLocalData(data)
    return deleted
  }
}
