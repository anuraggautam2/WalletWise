import express from 'express'
import { register, login, getMe, logout, forgotPassword, resetPassword } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import { validateRegister, validateLogin } from '../middleware/validate.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/me', protect, getMe)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
