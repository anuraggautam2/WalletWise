import React from 'react'
import { Wallet } from 'lucide-react'

export default function Footer({ onGetStarted, onNavigate }) {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Product', href: '#product' },
    { name: 'FAQ', href: '#faq' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="pt-16 pb-12 bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dark-border">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 group inline-flex"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-text-main group-hover:text-emerald-400 transition-colors">
                WalletWise
              </span>
            </a>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              The modern personal finance application built specifically for students to record expenses, manage monthly allowances, and build disciplined financial habits.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-secondary hover:text-text-main transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Account Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('login')}
                  className="text-text-secondary hover:text-text-main transition-colors"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('register')}
                  className="text-text-secondary hover:text-text-main transition-colors"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {currentYear} WalletWise. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Student Financial Privacy Guaranteed</span>
            <span>&bull;</span>
            <span>Zero Third-Party Ads</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
