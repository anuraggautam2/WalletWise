import mongoose from 'mongoose'

// Global connection caching across serverless invocations
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, lastFailure: 0 }
}

export const connectDB = async () => {
  // If already connected, return existing connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return true
  }

  const uri = process.env.MONGODB_URI

  // If no external MONGODB_URI configured and running in dev, fallback to local store
  if (!uri) {
    console.log('[MongoDB] Notice: No MONGODB_URI configured. Running in resilient local store mode.')
    return false
  }

  // Prevent blocking consecutive requests when DB is unreachable (15s cooldown)
  if (cached.lastFailure && (Date.now() - cached.lastFailure < 15000)) {
    return false
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      autoIndex: process.env.NODE_ENV !== 'production',
      maxPoolSize: 10
    }

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`[MongoDB] Connected to cluster: ${mongooseInstance.connection.host}`)
      cached.lastFailure = 0
      return mongooseInstance
    }).catch((err) => {
      cached.promise = null
      cached.lastFailure = Date.now()
      console.error(`[MongoDB] Connection failed: ${err.message}`)
      return null
    })
  }

  try {
    cached.conn = await cached.promise
    return Boolean(cached.conn && mongoose.connection.readyState === 1)
  } catch (err) {
    cached.promise = null
    cached.conn = null
    cached.lastFailure = Date.now()
    return false
  }
}

export const getDBStatus = () => {
  return Boolean(cached && cached.conn && mongoose.connection.readyState === 1)
}
