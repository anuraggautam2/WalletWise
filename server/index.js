import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { connectDB, getDBStatus } from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'
import userRoutes from './routes/userRoutes.js'
import savingsRoutes from './routes/savingsRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// Trust reverse proxy (Vercel, AWS, Nginx) so rate limiter and IP detection function safely
app.set('trust proxy', 1)

// Connect database (auto-falls back to local JSON persistence if offline)
connectDB()

// Database connection guarantee middleware for serverless execution
app.use(async (req, res, next) => {
  if (process.env.MONGODB_URI && !getDBStatus()) {
    try {
      await connectDB()
    } catch (err) {
      console.warn('[DB Middleware] Connection attempt deferred:', err.message)
    }
  }
  next()
})

// -------------------------------------------------------------
// SECURITY & ESSENTIAL MIDDLEWARE
// -------------------------------------------------------------
// Helmet HTTP security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}))

// Permissive CORS for dev and production / Vercel deployments
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin) or any valid origin
      callback(null, true)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// Request payload limit to prevent DoS attacks
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '20kb' }))
app.use(cookieParser())

// Rate limiting: Global API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }
})
app.use('/api', apiLimiter)
app.use(apiLimiter)

// Strict Rate Limiting on Authentication routes (anti brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false }
})
app.use(['/api/auth/login', '/auth/login'], authLimiter)
app.use(['/api/auth/register', '/auth/register'], authLimiter)

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'online',
    appName: 'WalletWise Student Expense Tracker API',
    database: getDBStatus() ? 'MongoDB Cluster' : 'Resilient JSON Store',
    timestamp: new Date().toISOString()
  })
})

// Support both /api/* and direct mounts for serverless rewrites
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)

app.use('/api/transactions', transactionRoutes)
app.use('/transactions', transactionRoutes)

app.use('/api/budgets', budgetRoutes)
app.use('/budgets', budgetRoutes)

app.use('/api/users', userRoutes)
app.use('/users', userRoutes)

app.use('/api/savings', savingsRoutes)
app.use('/savings', savingsRoutes)

// 404 handler for undefined API routes
app.use((req, res, next) => {
  if (
    req.originalUrl.startsWith('/api') ||
    req.originalUrl.startsWith('/auth') ||
    req.originalUrl.startsWith('/transactions') ||
    req.originalUrl.startsWith('/budgets') ||
    req.originalUrl.startsWith('/users') ||
    req.originalUrl.startsWith('/savings')
  ) {
    return res.status(404).json({
      success: false,
      message: `API endpoint '${req.originalUrl}' does not exist.`
    })
  }
  next()
})

// Safe Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ success: false, message: messages.join(', ') })
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'A record with this unique identifier already exists.' })
  }

  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// Start server locally when not running in serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[WalletWise Backend] API Server active on http://localhost:${PORT}`)
  })
}

export default app
