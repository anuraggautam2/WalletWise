import jwt from 'jsonwebtoken'
import { userStore } from '../utils/store.js'

export const protect = async (req, res, next) => {
  let token

  // 1. Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  // 2. Check cookies if available
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in to access this resource.'
    })
  }

  try {
    const secret = process.env.JWT_SECRET || 'walletwise_local_dev_secret_key_2026_secure_student_tracker'
    const decoded = jwt.verify(token, secret)

    const user = await userStore.findById(decoded.id)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The account belonging to this session no longer exists.'
      })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.'
    })
  }
}

export const signToken = (id) => {
  const secret = process.env.JWT_SECRET || 'walletwise_local_dev_secret_key_2026_secure_student_tracker'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign({ id }, secret, { expiresIn })
}
