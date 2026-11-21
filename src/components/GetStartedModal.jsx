import React from 'react'
import { X, Wallet, ArrowRight } from 'lucide-react'
import Button from './ui/Button'

export default function GetStartedModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-dark-card rounded-xl border border-dark-border p-6 sm:p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-main rounded-lg hover:bg-dark-secondary transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-5 h-5" />
        </div>

        <h3 className="text-xl font-bold text-text-main tracking-tight">
          Get Started with WalletWise
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
          Create your free student financial ledger account to start tracking allowances, pacing budgets, and hitting savings milestones.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onClose()
              if (onNavigate) onNavigate('register')
            }}
            className="w-full"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onClose()
              if (onNavigate) onNavigate('login')
            }}
            className="w-full text-xs text-text-muted hover:text-text-main"
          >
            <span>Already have an account? Sign in</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
