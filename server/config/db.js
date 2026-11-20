import mongoose from 'mongoose'

let isConnected = false
let connectionPromise = null

export const connectDB = async () => {
  if (isConnected) return true
  if (connectionPromise) return connectionPromise

  const uri = process.env.MONGODB_URI

  // In Vercel or production serverless, if no MONGODB_URI or default localhost is configured,
  // skip trying to connect to 127.0.0.1 to avoid 2-second timeout delays on cold starts
  if (!uri || (process.env.VERCEL && uri.includes('127.0.0.1'))) {
    isConnected = false
    console.log(`[MongoDB] No external MONGODB_URI configured. Running in resilient local JSON-persisted store mode.`)
    return false
  }

  try {
    connectionPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
      bufferCommands: false,
    })
    const conn = await connectionPromise
    isConnected = true
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}`)
    return true
  } catch (err) {
    isConnected = false
    connectionPromise = null
    console.log(`[MongoDB] Notice: Remote MongoDB not reachable (${err.message}). Using resilient local store.`)
    return false
  }
}

export const getDBStatus = () => isConnected
