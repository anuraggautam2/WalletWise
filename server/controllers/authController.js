import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { userStore } from '../utils/store.js'
import { signToken } from '../middleware/auth.js'

// Helper to send token response & set cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id || user.id)

  const isProduction = process.env.NODE_ENV === 'production'
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax'
  }

  res.cookie('token', token, cookieOptions)

  // Ensure password is never exposed in response
  const userResponse = {
    _id: user._id || user.id,
    name: user.name,
    email: user.email,
    currency: user.currency || 'INR',
    dateFormat: user.dateFormat || 'DD/MM/YYYY',
    createdAt: user.createdAt
  }

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse
  })
}

// -------------------------------------------------------------
// POST /api/auth/register
// -------------------------------------------------------------
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const existing = await userStore.findByEmail(email)
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.'
      })
    }

    const newUser = await userStore.create({
      name,
      email,
      password
    })

    sendTokenResponse(newUser, 201, res)
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/auth/login
// -------------------------------------------------------------
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userStore.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      })
    }

    sendTokenResponse(user, 200, res)
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// GET /api/auth/me (Protected)
// -------------------------------------------------------------
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
}

// -------------------------------------------------------------
// POST /api/auth/logout
// -------------------------------------------------------------
export const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  })
}

// -------------------------------------------------------------
// POST /api/auth/forgot-password
// -------------------------------------------------------------
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your registered email.' })
    }

    const user = await userStore.findByEmail(email)
    if (!user) {
      // Do not disclose whether email exists for security
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, password reset instructions have been generated.'
      })
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await userStore.saveResetToken(email, hashedToken, expires)

    res.status(200).json({
      success: true,
      message: 'Password reset link has been prepared.',
      // Provided in development response for easy testing without external email setup
      demoResetToken: resetToken
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// POST /api/auth/reset-password/:token
// -------------------------------------------------------------
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password, confirmPassword } = req.body

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' })
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await userStore.findByResetToken(hashedToken)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token.'
      })
    }

    await userStore.update(user._id || user.id, {
      password,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined
    })

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now log in with your new password.'
    })
  } catch (err) {
    next(err)
  }
}
