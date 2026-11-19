import React from 'react'
import { Wallet } from 'lucide-react'

export default function Footer({ onGetStarted }) {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ]

  const featureLinks = [
    { name: 'Expense Tracking', href: '#features' },
    { name: 'Budget Management', href: '#features' },
    { name: 'Spending Analytics', href: '#features' },
    { name: 'Transaction History', href: '#features' },
    { name: 'Monthly Reports', href: '#features' },
    { name: 'Savings Awareness', href: '#features' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="pt-16 pb-12" style={{ background: '#0A1020', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 group inline-flex"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-glow-blue group-hover:shadow-lg transition-all">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl tracking-tight text-text-primary group-hover:text-text-accent transition-colors">
                WalletWise
              </span>
            </a>

            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              The intuitive expense tracking platform designed specifically for students to record expenses, manage monthly budgets, and build healthy financial habits.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-md text-xs text-text-muted font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Student Finance Platform
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-text-secondary hover:text-text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {featureLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-text-secondary hover:text-text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {currentYear} WalletWise. All rights reserved.</p>
          <p className="text-text-subtle">
            Designed for students &bull; Built with precision
          </p>
        </div>

      </div>
    </footer>
  )
}
