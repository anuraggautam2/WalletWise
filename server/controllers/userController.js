import bcrypt from 'bcryptjs'
import { userStore } from '../utils/store.js'

// -------------------------------------------------------------
// PUT /api/users/profile
// -------------------------------------------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { name, currency, dateFormat } = req.body

    const updates = {}
    if (name) updates.name = name.trim()
    if (currency) updates.currency = currency
    if (dateFormat) updates.dateFormat = dateFormat

    const updated = await userStore.update(userId, updates)

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: updated
    })
  } catch (err) {
    next(err)
  }
}

// -------------------------------------------------------------
// PUT /api/users/change-password
// -------------------------------------------------------------
export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide both current and new password.' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match.' })
    }

    const userWithPw = await userStore.findByEmail(req.user.email)
    const isMatch = await bcrypt.compare(currentPassword, userWithPw.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' })
    }

    await userStore.update(userId, { password: newPassword })

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
    })
  } catch (err) {
    next(err)
  }
}
