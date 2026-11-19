import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('walletwise_token') || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize and verify user session on load
  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem('walletwise_token')
      const storedUser = localStorage.getItem('walletwise_user')

      if (storedToken) {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch (e) {}
        }

        try {
          const res = await api.getMe()
          if (res.success && res.user) {
            setUser(res.user)
            localStorage.setItem('walletwise_user', JSON.stringify(res.user))
          }
        } catch (err) {
          // Token expired or invalid
          setUser(null)
          setToken(null)
          localStorage.removeItem('walletwise_token')
          localStorage.removeItem('walletwise_user')
        }
      }
      setLoading(false)
    }

    initAuth()

    const handleExpired = () => {
      setUser(null)
      setToken(null)
    }
    window.addEventListener('auth-expired', handleExpired)
    return () => window.removeEventListener('auth-expired', handleExpired)
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const res = await api.login(email, password)
      if (res.success && res.token) {
        setToken(res.token)
        setUser(res.user)
        localStorage.setItem('walletwise_token', res.token)
        localStorage.setItem('walletwise_user', JSON.stringify(res.user))
        return { success: true }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  const register = async (name, email, password, confirmPassword) => {
    setError(null)
    try {
      const res = await api.register(name, email, password, confirmPassword)
      if (res.success && res.token) {
        setToken(res.token)
        setUser(res.user)
        localStorage.setItem('walletwise_token', res.token)
        localStorage.setItem('walletwise_user', JSON.stringify(res.user))
        return { success: true }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  const logout = async () => {
    try {
      await api.logout()
    } catch (e) {}
    setUser(null)
    setToken(null)
    localStorage.removeItem('walletwise_token')
    localStorage.removeItem('walletwise_user')
  }

  const updateProfile = async (profileData) => {
    try {
      const res = await api.updateProfile(profileData)
      if (res.success && res.user) {
        setUser(res.user)
        localStorage.setItem('walletwise_user', JSON.stringify(res.user))
        return { success: true, message: res.message }
      }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const changePassword = async (passwords) => {
    try {
      const res = await api.changePassword(passwords)
      return { success: true, message: res.message }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
