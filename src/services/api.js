// Centralized API Service for WalletWise
const API_BASE = '/api'

const getHeaders = () => {
  const token = localStorage.getItem('walletwise_token')
  const headers = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  }

  try {
    const res = await fetch(url, config)
    const data = await res.json()

    if (!res.ok) {
      // If 401 Unauthorized, handle expired token
      if (res.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
        localStorage.removeItem('walletwise_token')
        localStorage.removeItem('walletwise_user')
        window.dispatchEvent(new Event('auth-expired'))
      }
      throw new Error(data.message || 'An error occurred while processing your request')
    }

    return data
  } catch (err) {
    throw err
  }
}

export const api = {
  // Auth
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async register(name, email, password, confirmPassword) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
    })
  },

  async getMe() {
    return request('/auth/me', { method: 'GET' })
  },

  async logout() {
    return request('/auth/logout', { method: 'POST' })
  },

  async forgotPassword(email) {
    return request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  async resetPassword(token, password, confirmPassword) {
    return request(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password, confirmPassword }),
    })
  },

  // Transactions
  async getTransactions(params = {}) {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '' && v !== 'All') {
        query.append(k, v)
      }
    })
    const qs = query.toString() ? `?${query.toString()}` : ''
    return request(`/transactions${qs}`, { method: 'GET' })
  },

  async createTransaction(transactionData) {
    return request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    })
  },

  async updateTransaction(id, transactionData) {
    return request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    })
  },

  async deleteTransaction(id) {
    return request(`/transactions/${id}`, { method: 'DELETE' })
  },

  async getTransactionStats(month, year) {
    const query = new URLSearchParams()
    if (month) query.append('month', month)
    if (year) query.append('year', year)
    const qs = query.toString() ? `?${query.toString()}` : ''
    return request(`/transactions/stats${qs}`, { method: 'GET' })
  },

  // Budgets
  async getBudgets(month, year) {
    const query = new URLSearchParams()
    if (month) query.append('month', month)
    if (year) query.append('year', year)
    const qs = query.toString() ? `?${query.toString()}` : ''
    return request(`/budgets${qs}`, { method: 'GET' })
  },

  async setBudget(budgetData) {
    return request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budgetData),
    })
  },

  async deleteBudget(id) {
    return request(`/budgets/${id}`, { method: 'DELETE' })
  },

  // Profile & Settings
  async updateProfile(profileData) {
    return request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  },

  async changePassword(passwords) {
    return request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    })
  },

  // System Health
  async checkHealth() {
    return request('/health', { method: 'GET' })
  }
}
