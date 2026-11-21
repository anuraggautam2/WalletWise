import express from 'express'
import {
  getTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  exportTransactionsCSV
} from '../controllers/transactionController.js'
import { protect } from '../middleware/auth.js'
import { validateTransaction } from '../middleware/validate.js'

const router = express.Router()

// All transaction routes are protected
router.use(protect)

router.get('/stats', getTransactionStats)
router.get('/export/csv', exportTransactionsCSV)
router.get('/', getTransactions)
router.post('/', validateTransaction, createTransaction)
router.get('/:id', getTransactionById)
router.put('/:id', validateTransaction, updateTransaction)
router.delete('/:id', deleteTransaction)

export default router
