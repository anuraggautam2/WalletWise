import mongoose from 'mongoose'

export const SAVINGS_CATEGORIES = [
  'Emergency Fund',
  'Gadgets & Tech',
  'Tuition & Books',
  'Travel & Trips',
  'Semester Savings',
  'Personal Investment',
  'Other'
]

const savingsGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Please provide a savings goal title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please provide a target savings amount'],
      min: [1, 'Target amount must be at least 1']
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current savings amount cannot be negative']
    },
    targetDate: {
      type: Date
    },
    category: {
      type: String,
      enum: SAVINGS_CATEGORIES,
      default: 'Other'
    },
    color: {
      type: String,
      default: '#3B82F6'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: ''
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

savingsGoalSchema.index({ userId: 1, createdAt: -1 })

const SavingsGoal = mongoose.models.SavingsGoal || mongoose.model('SavingsGoal', savingsGoalSchema)
export default SavingsGoal
