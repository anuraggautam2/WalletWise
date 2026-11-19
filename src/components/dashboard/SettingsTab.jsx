import React, { useState } from 'react'
import {
  User,
  Shield,
  Key,
  Globe,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Save,
} from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useTransactions } from '../../context/TransactionContext'

export default function SettingsTab() {
  const { user, updateProfile, changePassword, logout } = useAuth()
  const { showToast } = useTransactions()

  // Profile form state
  const [name, setName] = useState(user?.name || '')
  const [currency, setCurrency] = useState(user?.currency || 'INR')
  const [dateFormat, setDateFormat] = useState(user?.dateFormat || 'DD/MM/YYYY')
  const [profileLoading, setProfileLoading] = useState(false)

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    const res = await updateProfile({ name, currency, dateFormat })
    setProfileLoading(false)
    if (res.success) {
      showToast('Profile preferences saved successfully!', 'success')
    } else {
      showToast(res.message || 'Failed to update profile', 'error')
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }

    setPasswordLoading(true)
    const res = await changePassword({ currentPassword, newPassword, confirmPassword })
    setPasswordLoading(false)

    if (res.success) {
      setPasswordSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      showToast('Password updated successfully!', 'success')
    } else {
      setPasswordError(res.message || 'Failed to change password.')
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl animate-fade-up">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
          Account Settings & Security
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
          Customize your profile, display preferences, and account security.
        </p>
      </div>

      {/* 1. Profile Information & Preferences */}
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-3 pb-5 border-b border-dark-border">
          <div className="w-9 h-9 rounded-xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Student Profile</h3>
            <p className="text-xs text-text-muted">Manage your personal identification details</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            {/* Email (Readonly) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary/50 border border-dark-border/50 text-text-muted text-sm cursor-not-allowed select-none"
              />
            </div>

            {/* Currency Preference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Primary Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            {/* Date Display Format */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Date Display Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 19/11/2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/19/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-11-19)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" loading={profileLoading}>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* 2. Change Password */}
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-3 pb-5 border-b border-dark-border">
          <div className="w-9 h-9 rounded-xl bg-brand-violet/15 text-brand-violet-light flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-main">Security Credentials</h3>
            <p className="text-xs text-text-muted">Update your account login password</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="mt-6 space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              New Password <span className="text-text-subtle font-normal">(min 6 chars)</span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-secondary border border-dark-border text-text-main text-sm focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              {passwordSuccess}
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" variant="secondary" loading={passwordLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* 3. Session & Danger Zone */}
      <Card className="p-6 border-red-500/20 bg-red-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-red-400">Account Session</h4>
            <p className="text-xs text-text-muted mt-0.5">
              Sign out from this device to invalidate the current local session token.
            </p>
          </div>
          <Button variant="danger" onClick={logout}>
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
