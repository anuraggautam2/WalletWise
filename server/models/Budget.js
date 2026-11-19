import mongoose from 'mongoose'

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    budgetType: {
      type: String,
      enum: ['overall', 'category'],
      default: 'overall',
      required: true
    },
    category: {
      type: String,
      default: 'Overall',
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please provide a valid budget amount'],
      min: [1, 'Budget must be at least 1']
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true,
      min: 2020,
      max: 2050
    }
  },
  {
    timestamps: true
  }
)

// Ensure unique budget per user, type/category, month, and year
budgetSchema.index({ userId: 1, budgetType: 1, category: 1, month: 1, year: 1 }, { unique: true })

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema)
export default Budget
