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

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// Connect database (auto-falls back to local JSON persistence if offline)
connectDB()

// -------------------------------------------------------------
// SECURITY & ESSENTIAL MIDDLEWARE
// -------------------------------------------------------------
// Helmet HTTP security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}))

// Restricted CORS
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
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
  legacyHeaders: false
})
app.use('/api', apiLimiter)

// Strict Rate Limiting on Authentication routes (anti brute-force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.'
  }
})
app.use('/api/auth/login', authLimiter)
app.use('/api/auth/register', authLimiter)

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    appName: 'WalletWise Student Expense Tracker API',
    database: getDBStatus() ? 'MongoDB Cluster' : 'Resilient File-Backed Store',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/budgets', budgetRoutes)
app.use('/api/users', userRoutes)

// 404 handler for undefined API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`[WalletWise Backend] API Server active on http://localhost:${PORT}`)
})

export default app
