import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'

export default function ConfirmDialog({
  isOpen,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to remove this record? This action cannot be undone.',
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-[#060A14]/80 backdrop-blur-md"
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-sm bg-dark-card border border-dark-border rounded-3xl p-6 shadow-2xl text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-text-main">{title}</h3>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">{message}</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="ghost" onClick={onCancel} disabled={loading} className="w-full">
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={loading}
              onClick={onConfirm}
              className="w-full bg-red-600 hover:bg-red-700 text-white border-transparent"
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
