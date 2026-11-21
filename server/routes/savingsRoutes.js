import express from 'express'
import {
  getSavingsGoals,
  createSavingsGoal,
  updateSavingsGoal,
  addSavingsDeposit,
  deleteSavingsGoal
} from '../controllers/savingsController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.route('/')
  .get(getSavingsGoals)
  .post(createSavingsGoal)

router.route('/:id')
  .put(updateSavingsGoal)
  .delete(deleteSavingsGoal)

router.route('/:id/deposit')
  .post(addSavingsDeposit)

export default router
