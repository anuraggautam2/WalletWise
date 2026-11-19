import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/walletwise'

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    })
    isConnected = true
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}`)
    return true
  } catch (err) {
    isConnected = false
    console.log(`[MongoDB] Notice: Remote/Local MongoDB not reachable (${err.message}).`)
    console.log(`[MongoDB] Using local high-performance JSON-persisted store (auto-connects to MongoDB Atlas when MONGODB_URI is provided in .env).`)
    return false
  }
}

export const getDBStatus = () => isConnected
