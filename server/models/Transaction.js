import mongoose from 'mongoose'

export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Education',
  'Shopping',
  'Entertainment',
  'Accommodation',
  'Bills',
  'Healthcare',
  'Other'
]

export const INCOME_CATEGORIES = [
  'Monthly Allowance',
  'Scholarship',
  'Part-time Work',
  'Freelancing',
  'Other'
]

export const PAYMENT_METHODS = [
  'Cash',
  'UPI',
  'Debit Card',
  'Credit Card',
  'Bank Transfer',
  'Other'
]

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Transaction type is required']
    },
    title: {
      type: String,
      required: [true, 'Please provide an expense/income title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide a valid amount'],
      min: [0.01, 'Amount must be greater than 0']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now,
      index: true
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      default: 'UPI'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
)

// Compound index for user query performance
transactionSchema.index({ userId: 1, date: -1 })
transactionSchema.index({ userId: 1, type: 1 })
transactionSchema.index({ userId: 1, category: 1 })

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
export default Transaction
