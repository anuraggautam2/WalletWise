import express from 'express'
import { getBudgets, setBudget, deleteBudget } from '../controllers/budgetController.js'
import { protect } from '../middleware/auth.js'
import { validateBudget } from '../middleware/validate.js'

const router = express.Router()

// All budget routes are protected
router.use(protect)

router.get('/', getBudgets)
router.post('/', validateBudget, setBudget)
router.delete('/:id', deleteBudget)

export default router
