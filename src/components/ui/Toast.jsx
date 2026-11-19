import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useTransactions } from '../../context/TransactionContext'

export default function Toast() {
  const { toast } = useTransactions()

  if (!toast) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-blue-light shrink-0" />,
  }

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-200',
    error: 'border-red-500/30 bg-red-950/40 text-red-200',
    info: 'border-brand-blue/30 bg-blue-950/40 text-blue-200',
  }

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id || 'toast'}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 max-w-md"
      >
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl ${
            borderColors[toast.type] || borderColors.info
          }`}
          style={{ background: '#111C30' }}
        >
          {icons[toast.type] || icons.info}
          <p className="text-sm font-medium text-text-main flex-1">{toast.message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
